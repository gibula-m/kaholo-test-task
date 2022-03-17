import {
  ClassConstructor,
  plainToClass,
  plainToInstance,
} from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const requestBodyValidator = (dto: any) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    next();
  };
};
