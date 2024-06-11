"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMiddlewares = void 0;
require("reflect-metadata");
function UseMiddlewares(...middlewares) {
    return (target, propertyKey, descriptor) => {
        if (!Reflect.hasMetadata("middlewares", target.constructor)) {
            Reflect.defineMetadata("middlewares", {}, target.constructor);
        }
        const middlewaresMap = Reflect.getMetadata("middlewares", target.constructor);
        middlewaresMap[propertyKey] = middlewares;
        Reflect.defineMetadata("middlewares", middlewaresMap, target.constructor);
    };
}
exports.UseMiddlewares = UseMiddlewares;
