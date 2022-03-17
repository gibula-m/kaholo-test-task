export const required = (name: string) => {
  console.info(`Env ${name} is required`);
  process.exit(1);
};
