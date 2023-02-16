export declare class DockerodeHelper {
    static docker: any;
    static getEnv(dockerConfig: any, envConfig: any, name: string): any;
    static up(dockerConfig: any, envConfig: any, hostPort: number, name: string): Promise<unknown>;
    static downByContainerId(containerId: string): Promise<unknown>;
    static down(containerId: string, name: string): Promise<unknown>;
    static pullImage(imageName: string): Promise<unknown>;
    static getContainerByName(name: string): Promise<unknown>;
    static generateDockerFile(dockerConfig: any, envConfig: any, name: string): Promise<any>;
    static generateDockerFileByContainerId(containerId: string): Promise<unknown>;
    static getPort(port: number, occupiedPorts?: number[], depth?: number): any;
    static envParser(envConfig: any): string[];
}
