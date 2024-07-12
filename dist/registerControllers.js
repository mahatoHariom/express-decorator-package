"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processModule = exports.registerControllers = exports.instantiateProvider = void 0;
const diContainer_1 = require("./diContainer");
const async_handler_1 = require("./async-handler");
function instantiateProvider(Cls) {
    return diContainer_1.diContainer.get(Cls);
}
exports.instantiateProvider = instantiateProvider;
function registerControllers(app, controllers) {
    controllers.forEach((ControllerCls) => {
        const controllerInstance = instantiateProvider(ControllerCls);
        const basePath = Reflect.getMetadata("path", ControllerCls) || "";
        const routes = Reflect.getMetadata("routes", ControllerCls);
        routes.forEach((route) => {
            const { method, path, handler } = route;
            const fullPath = `${basePath}${path}`;
            const middlewaresMap = Reflect.getMetadata("middlewares", ControllerCls) || {};
            const handlerMiddlewares = middlewaresMap[handler] || [];
            app[method](fullPath, ...handlerMiddlewares, (0, async_handler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const result = yield controllerInstance[handler](...args);
                if (result !== undefined && !res.headersSent) {
                    res.json(result);
                }
            })));
        });
    });
}
exports.registerControllers = registerControllers;
function processModule(module) {
    const controllers = Reflect.getMetadata("controllers", module) || [];
    const imports = Reflect.getMetadata("imports", module) || [];
    imports.forEach((importedModule) => {
        const importedControllers = processModule(importedModule);
        controllers.push(...importedControllers);
    });
    return controllers;
}
exports.processModule = processModule;
