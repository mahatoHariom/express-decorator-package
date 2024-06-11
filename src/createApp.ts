import express from "express";
import { ClassType } from "./decorators/module";
import { processModule, registerControllers } from "./registerControllers";

export function createApp(mainModule: ClassType) {
  const app = express();
  const providerInstances = new Map<ClassType, any>();
  const controllers = processModule(mainModule, providerInstances);
  registerControllers(app, controllers, providerInstances);
  return app;
}
