import "reflect-metadata";
import { Middleware } from "../types";
export declare function UseMiddlewares(...middlewares: Middleware[]): MethodDecorator;
