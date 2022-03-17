export enum LogItemType {
  INFO = "INFO",
}

export class Logger {
  private context: string;
  constructor(context?: string) {
    this.context = context ? context : "Application";
  }
  info(message: string) {
    this.log(LogItemType.INFO, message);
  }

  private log(type: LogItemType, message: string) {
    console.log(`${Date.now()} | [${type}][${this.context}] - ${message}`);
  }
}
