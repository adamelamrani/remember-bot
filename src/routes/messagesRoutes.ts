export { }
import { Request, Response } from 'express';
import statusSelector from '../utils/statusSelector';
const express = require('express');
const messagesRouter = express();

messagesRouter.get('/', (req: Request, res: Response) => {
  console.log(statusSelector(res.statusCode)((`Resquest to endpoint "/messages" with status code ${res.statusCode}`)));
  res.send('Hello World!');
})

export default messagesRouter;