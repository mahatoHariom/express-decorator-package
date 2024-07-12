import express from "express";
import { ClassType } from "./decorators/module";
import { processModule, registerControllers } from "./registerControllers";


export function createApp(mainModule: ClassType) {
  const app = express();
  const controllers = processModule(mainModule);
  registerControllers(app, controllers);
  return app;
}
