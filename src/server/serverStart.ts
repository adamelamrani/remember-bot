import { Express } from "express";
const chalk = require("chalk");
import statusSelector from "../utils/statusSelector";
import "reflect-metadata"
import "dotenv/config";
import { DataSource } from "typeorm"
import Chat from "../db/chats/entity/ChatsEntity";
import Message from "../db/messages/entity/MessagesEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Chat, Message],
  synchronize: true,
  logging: false,
})

const serverStart = (port: number, app: Express) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      AppDataSource.initialize()
        .then(() => {
          console.log("Database is connected")
          // here you can start to work with your database
        })
        .catch((error) => console.log(error))
      resolve(console.log(statusSelector(0)(`Server is listening at http://localhost:${port}`)));
    });
    server.on("error", (error) => {
      chalk.red.bold.underline(`Error on server ${error.message}`);
      reject(new Error(`Error on server ${error.message}`));
    });
  });

export default serverStart;