import { NextFunction, Request, Response } from "express";
import CommandHistoryRepository from "../database/command-history/repository";
import { runCommand } from "./shell.service";
import { ExecuteShellResponse } from "./shell.type";

export const executeShellCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const command = req.body.shellCommand as string;
  const repository = new CommandHistoryRepository();
  try {
    const result = await runCommand(command.trim(), repository);
    const response: ExecuteShellResponse = {
      result,
    };
    res.send(response);
  } catch (e) {
    next(e);
  }
};
