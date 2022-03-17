import { spawn } from "child_process";

export const runCommand = async (command: string): Promise<string[]> => {
  const parts = command.split(" ");
  const base = parts.shift();
  return (await asyncSpawn(base!, parts)).split("\n");
};

const asyncSpawn = (
  command: string,
  options: Array<string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const commandExecution = spawn(command, options);
    commandExecution.stdout.on("data", (data: Buffer) => {
      resolve(data.toString());
    });
    commandExecution.stderr.on("data", (data: Buffer) => {
      reject(new Error(data.toString()));
    });
    commandExecution.on("error", (err: Error) => {
      reject(err);
    });
    commandExecution.on("close", () => {
      resolve("true");
    });
  });
};
