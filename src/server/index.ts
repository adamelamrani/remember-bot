
import express from 'express';
import messagesRouter from '../routes/messagesRoutes';

const app = express()


app.use(express.json());
app.use("/messages", messagesRouter);



module.exports = app;