import "dotenv/config";
import express from 'express';
import messagesRouter from '../routes/messagesRoutes';
import { Message } from "node-telegram-bot-api";
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_API_KEY;

const app = express()
const crypto = require('crypto').randomUUID();
const bot = new TelegramBot(token, { polling: true });

/* bot.on('message', (msg: Message) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg ? msg?.from?.username : "World"}`);
}); */


bot.onText(/\/remember/, (msg: Message) => {
  const messageToRemember = msg.reply_to_message?.text;
  const bodyRequest = {
    username: msg.reply_to_message?.from?.first_name,
    id: crypto,
    message: messageToRemember,
    date: msg.date
  }
  const chatId = msg.chat.id;
  console.log('bodyRequest', bodyRequest);
  bot.sendMessage(chatId, messageToRemember ? `Esto se enviará a la base de datos: ${JSON.stringify(bodyRequest)}?` : `Responde al mensaje que quieras recordar con el comando, perro!`);

  if (messageToRemember) {
    fetch('http://localhost:3000/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      /* body: JSON.stringify({ message: messageToRemember }) */
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al llamar al endpoint /messages');
      })
      .then(data => {
        bot.sendMessage(chatId, 'Respuesta del backend (por implementar): ' + data.message);
      })
      .catch(error => {
        bot.sendMessage(chatId, 'Error al llamar al endpoint /messages:', error.message);
      });
  }

});

app.use(express.json());
app.use("/messages", messagesRouter);



module.exports = app;