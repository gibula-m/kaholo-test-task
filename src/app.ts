import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/application.config";
import { executeShellCommand } from "./module/shell.controller";
import { Logger } from "./utility/logger";
import { ExecuteShellDTO } from "./module/shell.dto";
import bodyParser from "body-parser";
import { IError } from "./utility/type";
import { connectToDatabase } from "./database/client";
import { makeValidateBody } from "express-class-validator";

const logger = new Logger("MainApplication");

const app = express();
app.use(bodyParser.json());

const appConfig = config();

app.post("/execute", makeValidateBody(ExecuteShellDTO), executeShellCommand);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const response: IError = {
    ts: Date.now().toString(),
    statusCode: 500,
    message: err.message,
  };
  res.status(response.statusCode).send(response);
});

connectToDatabase(() => {
  app.listen(appConfig.PORT, () => {
    logger.info(`The application is listening on port ${appConfig.PORT}!`);
  });
});
