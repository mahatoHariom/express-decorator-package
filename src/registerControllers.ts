
import express, { NextFunction, Request, Response } from "express";
import {
  CONTROLLERS_KEY,
  ClassType,
  DESIGN_PARAM_TYPES,
  IMPORTS_KEY,
  PROVIDERS_KEY,
} from "./decorators/module";
import { Middleware, RouteMetadata } from "./types";
import { asyncHandler } from "./async-handler";

export function instantiateProvider(
  Cls: ClassType,
  providerInstances: Map<ClassType, any>
): any {
  if (providerInstances.has(Cls)) return providerInstances.get(Cls)
  const deps = Reflect.getMetadata(DESIGN_PARAM_TYPES, Cls) ?? [];
  const params = deps.map((dep: ClassType) =>
    instantiateProvider(dep, providerInstances)
  );
  const instance = new Cls(...params);
  providerInstances.set(Cls, instance);
  return instance;
}

export function registerControllers(
  app: express.Application,
  controllers: ClassType[],
  providerInstances: Map<ClassType, any>
) {
  controllers.forEach((ControllerCls) => {
    const controllerInstance = instantiateProvider(
      ControllerCls,
      providerInstances
    );
    const basePath = Reflect.getMetadata("path", ControllerCls) || "";
    const routes = Reflect.getMetadata(
      "routes",
      ControllerCls
    ) as RouteMetadata[];

    routes.forEach((route) => {
      const { method, path, handler } = route;
      const fullPath = `${basePath}${path}`;
      const middlewaresMap =
        (Reflect.getMetadata("middlewares", ControllerCls) as Record<
          string | symbol,
          Middleware[]
        >) || {};
      const handlerMiddlewares = middlewaresMap[handler] || [];

      app[method](
        fullPath,
        ...handlerMiddlewares,
        asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
            const args = [];
            const paramsMeta =
              Reflect.getMetadata(
                handler.toString(),
                ControllerCls.prototype
              ) || [];

            paramsMeta.forEach((param: any) => {
              switch (param.type) {
                case "body":
                  args[param.index] = req.body;
                  break;
                case "req":
                  args[param.index] = req;
                  break;
                case "res":
                  args[param.index] = res;
                  break;
                case "next":
                  args[param.index] = next;
                  break;
               
                default:
                  args[param.index] = undefined;
              }
            });

            const result = await controllerInstance[handler](...args);

            if (result !== undefined && !res.headersSent) {
              res.json(result);
            }
          }
        )
      );
    });
  });
}


export function processModule(
  module: ClassType,
  providerInstances: Map<ClassType, any>
): ClassType[] {
  const providers = Reflect.getMetadata(PROVIDERS_KEY, module) || [];
  providers.forEach((provider: ClassType) =>
    instantiateProvider(provider, providerInstances)
  );

  const controllers = Reflect.getMetadata(CONTROLLERS_KEY, module) || [];
  const imports = Reflect.getMetadata(IMPORTS_KEY, module) || [];

  imports.forEach((importedModule: ClassType) => {
    const importedControllers = processModule(
      importedModule,
      providerInstances
    );
    controllers.push(...importedControllers);
  });

  return controllers;
}