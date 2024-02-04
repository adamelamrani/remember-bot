import express from 'express';
/* import MessagesController from '../../controllers/messages/messagesController';


const messages = new MessagesController(); */

const messagesRouter = express();

/* messagesRouter.get('/', messages.getMessages)
messagesRouter.get('/:username', messages.getMessagesByUsername)
messagesRouter.post('/', messages.addMessage) */

export default messagesRouter;