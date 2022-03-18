import CommandHistoryRepository from "../src/database/command-history/repository";
import { runCommand } from "../src/module/shell.service";

describe("shell command", () => {
  const repo = new CommandHistoryRepository();
  repo.create = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  });

  it("execute error", async () => {
    const cmd = "mkdir test";
    try {
      const result = await runCommand(cmd, repo);
    } catch (e: any) {
      expect(e.code).toBe(1);
      expect(e.cmd).toBe(cmd);
    }
  });

  it("execute success", async () => {
    const cmd = "ls";
    const result = await runCommand(cmd, repo);
    expect(result.length).toBeGreaterThan(0);
    expect(result.includes("Dockerfile")).toBeTruthy();
  });
});
