import "reflect-metadata";
export declare class DIContainer {
    private services;
    get<T>(someClass: {
        new (...args: any[]): T;
    }): T;
    private resolveDependencies;
}
export declare const diContainer: DIContainer;
