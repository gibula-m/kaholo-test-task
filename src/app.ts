import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/application.config";
import { executeShellCommand } from "./module/shell.controller";
import { Logger } from "./utility/logger";
import { ExecuteShellDTO } from "./module/shell.dto";
import { requestBodyValidator } from "./filter/validator";
import bodyParser from "body-parser";

const logger = new Logger("MainApplication");

const app = express();
app.use(bodyParser.json());

const appConfig = config();

app.post(
  "/execute",
  requestBodyValidator(ExecuteShellDTO),
  executeShellCommand
);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send(err.message);
});

app.listen(appConfig.PORT, () => {
  logger.info(`The application is listening on port ${appConfig.PORT}!`);
});
