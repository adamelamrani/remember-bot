import "reflect-metadata"
import "dotenv/config";
import serverStart from "./server/serverStart";
import chalk from "chalk";
import app from "./server/index"

const port = Number(process.env.PORT) || 3000;
(async () => {
  try {
    await serverStart(port, app);
  } catch (error) {
    chalk.red((error as Error).message);
  }
})();