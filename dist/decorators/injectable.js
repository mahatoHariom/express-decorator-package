"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
function Injectable() {
    return (target) => {
        Reflect.defineMetadata("injectable", true, target);
    };
}
exports.Injectable = Injectable;
