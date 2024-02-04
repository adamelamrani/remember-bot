import express from 'express';
import ChatsController from '../../controllers/chats/chatsController';

const chats = new ChatsController();
const chatsRouter = express();
chatsRouter.get('/', chats.getChats)
/*
chatsRouter.get('/:id', chats.getChatById)
chatsRouter.post('/', chats.addChat) */

export default chatsRouter;