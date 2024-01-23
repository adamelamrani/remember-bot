
const express = require('express');
const app = express()
const messagesRouter = require('../routes/messagesRoutes');

app.use(express.json());
app.use("/messages", messagesRouter);



module.exports = app;