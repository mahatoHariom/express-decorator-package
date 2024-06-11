"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processModule = exports.registerControllers = exports.instantiateProvider = void 0;
const module_1 = require("./decorators/module");
const async_handler_1 = require("./async-handler");
function instantiateProvider(Cls, providerInstances) {
    if (providerInstances.has(Cls))
        return providerInstances.get(Cls);
    const deps = Reflect.getMetadata(module_1.DESIGN_PARAM_TYPES, Cls) ?? [];
    const params = deps.map((dep) => instantiateProvider(dep, providerInstances));
    const instance = new Cls(...params);
    providerInstances.set(Cls, instance);
    return instance;
}
exports.instantiateProvider = instantiateProvider;
function registerControllers(app, controllers, providerInstances) {
    controllers.forEach((ControllerCls) => {
        const controllerInstance = instantiateProvider(ControllerCls, providerInstances);
        const basePath = Reflect.getMetadata("path", ControllerCls) || "";
        const routes = Reflect.getMetadata("routes", ControllerCls);
        routes.forEach((route) => {
            const { method, path, handler } = route;
            const fullPath = `${basePath}${path}`;
            const middlewaresMap = Reflect.getMetadata("middlewares", ControllerCls) || {};
            const handlerMiddlewares = middlewaresMap[handler] || [];
            app[method](fullPath, ...handlerMiddlewares, (0, async_handler_1.asyncHandler)(async (req, res, next) => {
                const args = [];
                const paramsMeta = Reflect.getMetadata(handler.toString(), ControllerCls.prototype) || [];
                paramsMeta.forEach((param) => {
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
            }));
        });
    });
}
exports.registerControllers = registerControllers;
function processModule(module, providerInstances) {
    const providers = Reflect.getMetadata(module_1.PROVIDERS_KEY, module) || [];
    providers.forEach((provider) => instantiateProvider(provider, providerInstances));
    const controllers = Reflect.getMetadata(module_1.CONTROLLERS_KEY, module) || [];
    const imports = Reflect.getMetadata(module_1.IMPORTS_KEY, module) || [];
    imports.forEach((importedModule) => {
        const importedControllers = processModule(importedModule, providerInstances);
        controllers.push(...importedControllers);
    });
    return controllers;
}
exports.processModule = processModule;
