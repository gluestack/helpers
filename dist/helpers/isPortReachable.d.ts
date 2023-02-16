export default function isPortReachable(port: number, { host, timeout }?: {
    host?: string;
    timeout?: number;
}): Promise<boolean>;
