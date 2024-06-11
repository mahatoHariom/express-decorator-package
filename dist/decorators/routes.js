"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
require("reflect-metadata");
function createRouteDecorator(method) {
    return (path) => {
        return (target, propertyKey, descriptor) => {
            if (!Reflect.hasMetadata("routes", target.constructor)) {
                Reflect.defineMetadata("routes", [], target.constructor);
            }
            const routes = Reflect.getMetadata("routes", target.constructor);
            routes.push({
                method,
                path,
                handler: propertyKey,
            });
            Reflect.defineMetadata("routes", routes, target.constructor);
        };
    };
}
exports.Get = createRouteDecorator("get");
exports.Post = createRouteDecorator("post");
exports.Put = createRouteDecorator("put");
exports.Delete = createRouteDecorator("delete");
