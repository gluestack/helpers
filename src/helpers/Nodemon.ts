import { spawn } from "child_process";
import kill from "tree-kill";

export class NodemonHelper {
  static async up(cwd: string, script: string, portNumber: number) {
    return new Promise(async (resolve, reject) => {
      const commandArr = script.split(" ");
      const args = commandArr.shift();
      const process: any = spawn(args, commandArr, {
        cwd: cwd,
        stdio: "inherit",
      });
      if (process) {
        return resolve({
          status: "up",
          portNumber: portNumber,
          processId: process.pid,
        });
      }
      return reject(new Error("Process not created"));
    });
  }

  static async down(processId: string) {
    return new Promise(async (resolve, reject) => {
      if (processId) {
        kill(parseInt(processId), "SIGKILL", (err) => reject(err));
        resolve(true);
      }
      return resolve(true);
    });
  }
}
