import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Chat from '../db/chats/entity/Chat.entity';
import Message from '../db/messages/entity/Message.entity';
import { ChatRefactoringTIMESTAMP1707571248062 } from '../migrations/1707571248062-ChatRefactoringTIMESTAMP';
import { MessageRefactoringTIMESTAMP1707571327570 } from '../migrations/1707571327570-MessageRefactoringTIMESTAMP';

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
  migrations: [
    ChatRefactoringTIMESTAMP1707571248062,
    MessageRefactoringTIMESTAMP1707571327570,
  ],
  logging: false,
});
