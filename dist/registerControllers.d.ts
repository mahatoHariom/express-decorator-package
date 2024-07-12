import express from "express";
import { ClassType } from "./decorators/module";
export declare function instantiateProvider(Cls: ClassType): any;
export declare function registerControllers(app: express.Application, controllers: ClassType[]): void;
export declare function processModule(module: ClassType): ClassType[];
