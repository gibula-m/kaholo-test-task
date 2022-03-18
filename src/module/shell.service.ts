import { exec, spawn } from "child_process";
import CommandHistoryRepository from "../database/command-history/repository";

export const runCommand = async (
  command: string,
  repository: CommandHistoryRepository
): Promise<string[]> => {
  try {
    const result = await asyncSpawn(command);
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

const asyncSpawn = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    //spawn changed to exec because of light commands used here
    //in real life case we should dockerize processing of a command but I don't know use cases
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
