import { spawn } from "child_process";
import CommandHistoryRepository from "../database/command-history/repository";

const repository = new CommandHistoryRepository();

export const runCommand = async (command: string): Promise<string[]> => {
  //PROCESS
  const parts = command.split(" ");
  const base = parts.shift();
  try {
    const result = await asyncSpawn(base!, parts);
    //SAVE TO HISTORY
    await repository.create(command, result);
    //RETURN
    return result.split("\n");
  } catch (e: any) {
    //SAVE TO HISTORY
    await repository.create(command, e.message, false);
    throw e;
  }
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
