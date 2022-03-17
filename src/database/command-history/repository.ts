import { Logger } from "../../utility/logger";
import { CommandHistoryModel } from "./model";

export default class CommandHistoryRepository {
  private logger = new Logger(CommandHistoryRepository.name);
  constructor() {}

  async create(command: string, result: string, valid: boolean = true) {
    const newItem = new CommandHistoryModel({
      createdAt: Date.now().toString(),
      command: command,
      response: result,
      valid,
    });
    await newItem.save();
    this.logger.info("Item created");
  }
}
