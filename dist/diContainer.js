"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diContainer = exports.DIContainer = void 0;
require("reflect-metadata");
class DIContainer {
    constructor() {
        this.services = new Map();
    }
    get(someClass) {
        const existingInstance = this.services.get(someClass);
        if (existingInstance) {
            return existingInstance;
        }
        const instance = new someClass(...this.resolveDependencies(someClass));
        this.services.set(someClass, instance);
        return instance;
    }
    resolveDependencies(someClass) {
        const dependencies = Reflect.getMetadata("design:paramtypes", someClass) || [];
        return dependencies.map((dependency) => this.get(dependency));
    }
}
exports.DIContainer = DIContainer;
exports.diContainer = new DIContainer();
