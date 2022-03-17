import { Schema, model } from "mongoose";

export interface CommandHistory {
  createdAt: string;
  command: string;
  response: string;
  valid: boolean;
}

const schema = new Schema<CommandHistory>({
  createdAt: { type: String, required: true },
  command: { type: String, required: true },
  response: { type: String, required: true },
  valid: { type: Boolean, required: true },
});

export const CommandHistoryModel = model<CommandHistory>(
  "CommandHistory",
  schema
);
