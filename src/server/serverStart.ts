import { type Express } from 'express';
import statusSelector from '../utils/statusSelector';
import 'reflect-metadata'
import 'dotenv/config';
import { DataSource } from 'typeorm'
import chalk from 'chalk';
import Chat from '../db/chats/entity/Chat.entity';
import Message from '../db/messages/entity/Message.entity';

export const AppDataSource = new DataSource({
  metadataTableName: 'metadata',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Chat, Message],
  synchronize: true,
  logging: false
})

const serverStart = async (port: number | string, app: Express): Promise<void> => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      AppDataSource.initialize()
        .then(() => {
          console.log('Database is connected')
          // here you can start to work with your database
        })
        .catch((error) => { console.log(error); })
      resolve(() => { console.log(statusSelector(0)(`Server is listening at http://localhost:${port}`)) });
    });
    server.on('error', (error) => {
      chalk.red.bold.underline(`Error on server ${error.message}`);
      reject(new Error(`Error on server ${error.message}`));
    });
  });
}

export default serverStart;
