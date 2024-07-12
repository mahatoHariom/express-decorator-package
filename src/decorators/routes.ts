import "reflect-metadata";
import {  Method } from "../types";



function createRouteDecorator(method: Method) {
  return (path: string): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
      const routes = Reflect.getMetadata("routes", target.constructor) || [];
      routes.push({ method, path, handler: propertyKey });
      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
}

export const Get = createRouteDecorator("get");
export const Post = createRouteDecorator("post");
export const Put = createRouteDecorator("put");
export const Delete = createRouteDecorator("delete");
