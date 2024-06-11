"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const diContainer_1 = require("../diContainer");
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata("path", path, target);
        diContainer_1.diContainer.get(target); // Ensure the controller is instantiated by the DI container
    };
}
exports.Controller = Controller;
