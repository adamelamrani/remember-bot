import express from 'express';
import MessagesController from '../../controllers/messages/messagesController';

const messages = new MessagesController();

const messagesRouter = express();

messagesRouter.get('/', messages.getAllMessages)
messagesRouter.get('/:username', messages.getMessagesByUsername)
messagesRouter.get('/:username/last', messages.getLastMessageFromUser)
messagesRouter.post('/', messages.addMessage)

export default messagesRouter;