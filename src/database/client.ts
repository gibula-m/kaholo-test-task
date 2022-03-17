import { dbConfig } from "../config/application.config";
import { connect } from "mongoose";
import { Logger } from "../utility/logger";

const config = dbConfig();
const logger = new Logger("DatabaseClient");

export const connectToDatabase = async (callback: Function) => {
  logger.info("Database starting!");
  await connect(config.URL, {
    dbName: config.DBNAME,
    user: config.DBUSER,
    pass: config.DBPASSWD,
  });
  logger.info("Database on!");
  callback();
};
