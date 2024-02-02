import { Request, Response } from 'express';
import statusSelector from '../../utils/statusSelector';
import express from 'express';
import MessagesController from '../../controllers/chats/chatsController';

const chats = new MessagesController();

const messagesRouter = express();

messagesRouter.get('/', chats.getChats)

messagesRouter.post('/', (req: Request, res: Response) => {
  console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/messages" with status code ${res.statusCode}`)));
  res.send(JSON.stringify(`Este será el mensaje que se guardará en la BBDD: ${req.body}`));
})

export default messagesRouter;