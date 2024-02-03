import { Request, Response } from 'express';
import { query } from "../../db/dbConnect";
import statusSelector from "../../utils/statusSelector";

interface MessagesControllerInterface {
  getMessages(req: Request, res: Response): Promise<void>;
  getMessagesByUsername(req: Request, res: Response): Promise<void>;
  addMessage(req: Request, res: Response): Promise<void>;
}

class MessagesController implements MessagesControllerInterface {
  async getMessages(req: Request, res: Response): Promise<void> {

    try {
      const messages = await query('SELECT * FROM messages');

      if (messages.rowCount === 0) {
        res.set('Content-Type', 'application/json');
        res.status(404).send('No messages found');
      }

      if (res.statusCode === 200) {
        console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/messages" with status code ${res.statusCode}`)));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ messages: messages.rows }));
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getMessagesByUsername(req: Request, res: Response): Promise<void> {
    try {
      const messages = await query('SELECT * FROM messages WHERE username = $1', [req.params.username]);

      if (messages.rowCount === 0) {
        res.set('Content-Type', 'application/json');
        res.status(404).send('No messages found');
      }

      if (res.statusCode === 200) {
        console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/messages/${req.params.username}" with status code ${res.statusCode}`)));
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ messages: messages.rows }));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async addMessage(req: Request, res: Response): Promise<void> {
    try {
      if (req.body.message === undefined || req.body.message === '' || req.body.message === null) {
        console.log(statusSelector(res.statusCode)((`Resquest with POST method to endpoint "/messages/" with status code ${res.statusCode}`)));
        res.status(400).send('Bad Request. Message must be a string and cannot be empty');
        return;
      }

      if (req.body.username === undefined || req.body.username === '' || req.body.username === null) {
        console.log(statusSelector(res.statusCode)((`Resquest with POST method to endpoint "/messages/" with status code ${res.statusCode}`)));
        res.status(400).send('Bad Request. Username must be a string and cannot be empty');
        return;
      }

      await query('INSERT INTO messages (id, message, username, date, chatId) VALUES ($1, $2, $3, $4, $5)', [req.body.id, req.body.message, req.body.username, req.body.date, req.body.chatId]);
      if (res.statusCode === 200) {
        res.set('Content-Type', 'application/json');
        console.log(statusSelector(res.statusCode)((`Resquest with POST method to endpoint "/messages/" with status code ${res.statusCode}`)));
        res.status(201).send(JSON.stringify({ message: 'Message added' }));
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default MessagesController;