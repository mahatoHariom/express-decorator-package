"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata("path", path, target);
    };
}
exports.Controller = Controller;
