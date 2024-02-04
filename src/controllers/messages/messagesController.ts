import { Request, Response } from 'express';
import statusSelector from "../../utils/statusSelector";
import MessagesRepository from '../../db/messages/repository/MessagesRepository';

interface MessagesControllerInterface {
  getAllMessages(req: Request, res: Response): Promise<void>;
  getMessagesByUsername(req: Request, res: Response): Promise<void>;
  getLastMessageFromUser(req: Request, res: Response): Promise<void>;
  addMessage(req: Request, res: Response): Promise<void>;
}

class MessagesController implements MessagesControllerInterface {
  private messagesRepository = new MessagesRepository;

  getAllMessages = async (req: Request, res: Response): Promise<void> => {

    try {
      const messageList = await this.messagesRepository.getAllMessages();
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((`GET resquest to endpoint "/message" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ messages: messageList }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  getMessagesByUsername = async (req: Request, res: Response): Promise<void> => {

    try {
      const messageList = await this.messagesRepository.getAllMessagesFromUser(req.params.username);
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((`GET resquest to endpoint "/message/${req.params.username}" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ messages: messageList }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  getLastMessageFromUser = async (req: Request, res: Response): Promise<void> => {

    try {
      const message = await this.messagesRepository.getLastMessageFromUser(req.params.username);
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((`GET resquest to endpoint "/message/${req.params.username}" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ message: message }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  addMessage = async (req: Request, res: Response): Promise<void> => {

    try {
      await this.messagesRepository.save(req.body);
      res.set('Content-Type', 'application/json');

      console.log(statusSelector(res.statusCode)((` POST resquest to endpoint "/message" with status code ${res.statusCode}`)));
      res.status(200).send(JSON.stringify({ message: "Message added correctly" }));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default MessagesController;