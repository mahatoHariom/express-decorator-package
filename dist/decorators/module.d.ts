import "reflect-metadata";
export declare const CONTROLLERS_KEY = "controllers";
export declare const PROVIDERS_KEY = "providers";
export declare const IMPORTS_KEY = "imports";
export declare const DESIGN_PARAM_TYPES = "design:paramtypes";
export interface ClassType<T = any> {
    new (...args: any[]): T;
}
export interface ModuleMetadata {
    controllers?: ClassType[];
    providers?: ClassType[];
    imports?: ClassType[];
}
export declare function Module(metadata: ModuleMetadata): ClassDecorator;
