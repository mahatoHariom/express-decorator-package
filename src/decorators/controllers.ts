import { diContainer } from "../diContainer";


export function Controller(path: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("path", path, target);
    diContainer.get(target); // Ensure the controller is instantiated by the DI container
  };
}
