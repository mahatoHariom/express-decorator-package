"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const registerControllers_1 = require("./registerControllers");
function createApp(mainModule) {
    const app = (0, express_1.default)();
    const controllers = (0, registerControllers_1.processModule)(mainModule);
    (0, registerControllers_1.registerControllers)(app, controllers);
    return app;
}
exports.createApp = createApp;
