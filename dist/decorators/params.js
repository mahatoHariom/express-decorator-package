"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Next = exports.Res = exports.Req = exports.Body = void 0;
function createParamDecorator(type) {
    return () => {
        return (target, propertyKey, parameterIndex) => {
            const existingParameters = Reflect.getMetadata(propertyKey === null || propertyKey === void 0 ? void 0 : propertyKey.toString(), target) || [];
            existingParameters.push({ index: parameterIndex, type });
            Reflect.defineMetadata(propertyKey === null || propertyKey === void 0 ? void 0 : propertyKey.toString(), existingParameters, target);
        };
    };
}
exports.Body = createParamDecorator("body");
exports.Req = createParamDecorator("req");
exports.Res = createParamDecorator("res");
exports.Next = createParamDecorator("next");
