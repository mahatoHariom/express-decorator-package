import express from "express";
import { ClassType } from "./decorators/module";
export declare function instantiateProvider(Cls: ClassType, providerInstances: Map<ClassType, any>): any;
export declare function registerControllers(app: express.Application, controllers: ClassType[], providerInstances: Map<ClassType, any>): void;
export declare function processModule(module: ClassType, providerInstances: Map<ClassType, any>): ClassType[];
