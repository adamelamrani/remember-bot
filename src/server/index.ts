import "dotenv/config";
import express from 'express';
import messagesRouter from '../routes/messages/messagesRoutes';
import chatsRouter from "../routes/chats/chatRoutes";
import bot from "../bot/bot";

const token = process.env.TELEGRAM_API_KEY;

const app = express();
bot(token as string);
app.use(express.json());
app.use("/messages", messagesRouter);
app.use("/chats", chatsRouter);

export default app;