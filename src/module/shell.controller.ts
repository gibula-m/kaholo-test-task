import { NextFunction, Request, Response } from "express";
import { runCommand } from "./shell.service";
import { ExecuteShellResponse } from "./shell.type";

export const executeShellCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const command = req.body.shellCommand;
  try {
    const result = await runCommand(command);
    const response: ExecuteShellResponse = {
      result,
    };
    res.send(response);
  } catch (e) {
    next(e);
  }
};
