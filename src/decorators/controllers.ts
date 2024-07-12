export function Controller(path: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("path", path, target);
  };
}
