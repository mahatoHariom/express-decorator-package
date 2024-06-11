"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.DESIGN_PARAM_TYPES = exports.IMPORTS_KEY = exports.PROVIDERS_KEY = exports.CONTROLLERS_KEY = void 0;
require("reflect-metadata");
exports.CONTROLLERS_KEY = "controllers";
exports.PROVIDERS_KEY = "providers";
exports.IMPORTS_KEY = "imports";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
function Module(metadata) {
    return function (constructor) {
        Reflect.defineMetadata(exports.CONTROLLERS_KEY, metadata.controllers || [], constructor);
        Reflect.defineMetadata(exports.PROVIDERS_KEY, metadata.providers || [], constructor);
        Reflect.defineMetadata(exports.IMPORTS_KEY, metadata.imports || [], constructor);
    };
}
exports.Module = Module;
