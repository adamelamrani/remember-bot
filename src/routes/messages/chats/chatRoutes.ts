import express from 'express';
import ChatsController from '../../../controllers/chats/chatsController';


interface Chats {
  id: number;
  name: string;
}

const chats = new ChatsController();
const chatsRouter = express();

chatsRouter.get('/', chats.getChats)
chatsRouter.get('/:id', chats.getChatById)
chatsRouter.post('/', chats.addChat)

export default chatsRouter;