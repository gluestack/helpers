import { spawn } from "child_process";
import kill from "tree-kill";

export class SpawnHelper {
  static async run(cwd: string, commanderArray: Array<string>) {
    return new Promise(async (resolve, reject) => {
      const args = commanderArray.shift();
      const process: any = spawn(args, commanderArray, {
        cwd: cwd,
        stdio: [null, "pipe", "inherit"],
      });
      if (process) {
        await new Promise((res, rej) => {
          process.on("close", function () {
            return resolve(process.pid);
          });
        });
      }
      return reject(new Error("Process not created"));
    });
  }

  static async start(cwd: string, commanderArray: Array<string>) {
    return new Promise(async (resolve, reject) => {
      const args = commanderArray.shift();
      const process: any = spawn(args, commanderArray, {
        cwd: cwd,
        stdio: "ignore",
        detached: true,
      });
      if (process) {
        process.unref();
        return resolve({
          processId: process.pid,
        });
      }
      return reject(new Error("Process not created"));
    });
  }

  static async stop(processId: string) {
    return new Promise(async (resolve, reject) => {
      if (processId) {
        kill(parseInt(processId), "SIGKILL", (err) => reject(err));
        resolve(true);
      }
      return resolve(true);
    });
  }
}
