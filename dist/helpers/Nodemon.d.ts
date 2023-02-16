export declare class NodemonHelper {
    static up(cwd: string, portNumber: number, commanderArray: Array<string>): Promise<unknown>;
    static down(processId: string): Promise<unknown>;
}
