import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Chat from '../db/chats/entity/Chat.entity';
import Message from '../db/messages/entity/Message.entity';
import { ChatRefactoring1707991814038 } from '../migrations/1707991814038-ChatRefactoring';
import { MessageRefactoring1707991798634 } from '../migrations/1707991798634-MessageRefactoring';

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
  migrations: [ChatRefactoring1707991814038, MessageRefactoring1707991798634],
  logging: false,
});
