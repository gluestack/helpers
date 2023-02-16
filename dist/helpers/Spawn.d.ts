export declare class SpawnHelper {
    static run(cwd: string, commanderArray: Array<string>): Promise<unknown>;
    static start(cwd: string, commanderArray: Array<string>): Promise<unknown>;
    static stop(processId: string): Promise<unknown>;
}
