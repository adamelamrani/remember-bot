import { Express } from "express";
const chalk = require("chalk");
import statusSelector from "../utils/statusSelector";

const serverStart = (port: number, app: Express) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(console.log(statusSelector(0)(`Server is listening at http://localhost:${port}`)));
    });
    server.on("error", (error) => {
      chalk.red.bold.underline(`Error on server ${error.message}`);
      reject(new Error(`Error on server ${error.message}`));
    });
  });

export default serverStart;