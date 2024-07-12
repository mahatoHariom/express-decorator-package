import "reflect-metadata";


export class DIContainer {
  private services: Map<any, any> = new Map();

  get<T>(someClass: { new (...args: any[]): T }): T {
    if (!Reflect.getMetadata("injectable", someClass)) {
  
      throw new Error(`Class ${someClass.name} is not marked as Injectable`);
    }

    if (!this.services.has(someClass)) {
      const instance = new someClass(...this.resolveDependencies(someClass));
      this.services.set(someClass, instance);
    }
    return this.services.get(someClass);
  }

  private resolveDependencies(someClass: any): any[] {
    const dependencies =
      Reflect.getMetadata("design:paramtypes", someClass) || [];
    return dependencies.map((dependency: any) => this.get(dependency));
  }
}

export const diContainer = new DIContainer();
