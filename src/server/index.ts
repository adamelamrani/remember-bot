import 'dotenv/config';
import express from 'express';
import messagesRouter from '../routes/messages/messagesRoutes';
import chatsRouter from '../routes/chats/chatRoutes';
import bot from '../bot/bot';

const token = process.env.TELEGRAM_API_KEY;

const app = express();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
bot(token!);
app.use(express.json());
app.use('/message', messagesRouter);
app.use('/chat', chatsRouter);

export default app;
