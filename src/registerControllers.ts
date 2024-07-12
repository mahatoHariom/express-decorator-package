import express, { NextFunction, Request, Response } from "express";
import { RouteMetadata } from "./types";
import { diContainer } from "./diContainer";

import { asyncHandler } from "./async-handler";
import { ClassType } from "./decorators/module";


export function instantiateProvider(Cls: ClassType): any {
  return diContainer.get(Cls);
}

export function registerControllers(
  app: express.Application,
  controllers: ClassType[]
) {
  controllers.forEach((ControllerCls) => {
    const controllerInstance = instantiateProvider(ControllerCls);
    const basePath = Reflect.getMetadata("path", ControllerCls) || "";
    const routes = Reflect.getMetadata(
      "routes",
      ControllerCls
    ) as RouteMetadata[];

    routes.forEach((route) => {
      const { method, path, handler } = route;
      const fullPath = `${basePath}${path}`;
      const middlewaresMap =
        Reflect.getMetadata("middlewares", ControllerCls) || {};
      const handlerMiddlewares = middlewaresMap[handler] || [];

      app[method](
        fullPath,
        ...handlerMiddlewares,
        asyncHandler(
          async (req: Request, res: Response, next: NextFunction) => {
            const args: any[] = [];
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

export function processModule(module: ClassType): ClassType[] {
  const controllers = Reflect.getMetadata("controllers", module) || [];
  const imports = Reflect.getMetadata("imports", module) || [];

  imports.forEach((importedModule: ClassType) => {
    const importedControllers = processModule(importedModule);
    controllers.push(...importedControllers);
  });

  return controllers;
}
