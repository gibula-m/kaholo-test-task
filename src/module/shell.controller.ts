import { NextFunction, Request, Response } from "express";
import { runCommand } from "./shell.service";

export const executeShellCommand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const command = req.body.shellCommand;
  try {
    const result = await runCommand(command);
    res.send(result);
  } catch (e) {
    next(e);
  }
};
