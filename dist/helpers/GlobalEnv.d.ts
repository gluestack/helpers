export declare class GlobalEnv {
    static getKey(instanceName: string, key: string): string;
    static get(instanceName: string, key: string): Promise<any>;
    static set(instanceName: string, key: string, value: string): Promise<void>;
}
