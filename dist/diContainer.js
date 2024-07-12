"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diContainer = exports.DIContainer = void 0;
require("reflect-metadata");
class DIContainer {
    constructor() {
        this.services = new Map();
    }
    get(someClass) {
        if (!Reflect.getMetadata("injectable", someClass)) {
            throw new Error(`Class ${someClass.name} is not marked as Injectable`);
        }
        if (!this.services.has(someClass)) {
            const instance = new someClass(...this.resolveDependencies(someClass));
            this.services.set(someClass, instance);
        }
        return this.services.get(someClass);
    }
    resolveDependencies(someClass) {
        const dependencies = Reflect.getMetadata("design:paramtypes", someClass) || [];
        return dependencies.map((dependency) => this.get(dependency));
    }
}
exports.DIContainer = DIContainer;
exports.diContainer = new DIContainer();
