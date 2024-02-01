export { };
import "dotenv/config";
const serverStart = require("./server/serverStart");
const chalk = require("chalk");
const app = require("./server/index");

const port = process.env.PORT;
//const dataBaseUrl = process.env.DATA_BASE_URL;
(async () => {
  try {
    await serverStart(port, app);
    //await connectDataBase(dataBaseUrl);
  } catch (error) {
    chalk.red((error as Error).message);
  }
})();