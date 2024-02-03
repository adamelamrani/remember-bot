import { Request, Response } from 'express';
import { query } from "../../db/dbConnect";
import statusSelector from "../../utils/statusSelector";

interface ChatsControllerInterface {
  getChats(req: Request, res: Response): Promise<void>;
  getChatById(req: Request, res: Response): Promise<void>;
  addChat(req: Request, res: Response): Promise<void>;
}

class ChatsController implements ChatsControllerInterface {
  async getChats(req: Request, res: Response): Promise<void> {

    try {
      const chats = await query('SELECT * FROM chats');

      if (chats.rowCount === 0) {
        res.set('Content-Type', 'application/json');
        res.status(404).send('No chats found');
      }

      if (res.statusCode === 200) {
        console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/chats" with status code ${res.statusCode}`)));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ chats: chats.rows }));
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getChatById(req: Request, res: Response): Promise<void> {
    try {
      const chat = await query('SELECT * FROM chats WHERE chatId = $1', [req.params.id]);

      if (chat.rowCount === 0) {
        res.set('Content-Type', 'application/json');
        res.status(404).send('No chats found');
      }

      if (res.statusCode === 200) {
        console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/chats/${req.params.id}" with status code ${res.statusCode}`)));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ chats: chat.rows }));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async addChat(req: Request, res: Response): Promise<void> {
    try {
      if (req.body.chatName === undefined || req.body.chatName === '' || req.body.chatName === null) {
        res.status(400).send('Bad Request. Name must be a string and cannot be empty');
        return;
      }

      if (req.body.chatId === undefined || isNaN(req.body.chatId) || req.body.chatId === null) {
        res.status(400).send('Bad Request. Id must be a number');
        return;
      }
      await query('INSERT INTO chats (chatId, chatName) VALUES ($1, $2)', [req.body.chatId, req.body.chatName]);
      if (res.statusCode === 200) {
        res.set('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify({ message: 'Chat added' }));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

  }
};

export default ChatsController;