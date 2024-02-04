import { Request, Response } from 'express';
import statusSelector from "../../utils/statusSelector";
import ChatRepository from '../../db/chats/repository/chatRepository';

interface ChatsControllerInterface {
  getChats(req: Request, res: Response): Promise<void>;
  getChatById(req: Request, res: Response): Promise<void>;
  addChat(req: Request, res: Response): Promise<void>;
}

class ChatsController implements ChatsControllerInterface {
  private chatRepository = new ChatRepository();

  getChats = async (req: Request, res: Response): Promise<void> => {

    try {
      const chatList = await this.chatRepository.getAllChats();
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((`GET resquest to endpoint "/chat" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ chats: chatList }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  getChatById = async (req: Request, res: Response): Promise<void> => {

    try {
      const chat = await this.chatRepository.getChatById(Number(req.params.id));
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((`GET resquest to endpoint "/chat" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ chat: chat }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  addChat = async (req: Request, res: Response): Promise<void> => {

    try {
      await this.chatRepository.save(req.body);
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((` POST resquest to endpoint "/chat" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ message: "Chat added correctly" }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

export default ChatsController;