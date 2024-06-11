"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const diContainer_1 = require("../diContainer");
function Injectable() {
    return (target) => {
        diContainer_1.diContainer.get(target);
    };
}
exports.Injectable = Injectable;
