import TelegramBot, { Message } from "node-telegram-bot-api";

const bot = (token: string) => {
  const crypto = require('crypto').randomUUID();
  const bot = new TelegramBot(token as string, { polling: true });

  bot.onText(/\/remember/, (msg: Message) => {
    const chatId = msg.chat.id;
    const messageToRemember = msg.reply_to_message?.text;
    const bodyRequest = {
      username: msg.reply_to_message?.from?.first_name,
      id: crypto,
      message: messageToRemember,
      date: msg.date
    }

    if (msg.chat.type === "private") {
      bot.sendMessage(msg.chat.id, "I will only remember messages from groups");
      return;
    }

    bot.sendMessage(chatId, messageToRemember ? `Esto se enviará a la base de datos: ${JSON.stringify(bodyRequest)}?` : `Responde al mensaje que quieras recordar con el comando, perro!`);

    if (messageToRemember) {
      fetch(`${process.env.API_URL}chats`, {
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
          throw new Error('Error al hacer la petición');
        })
        .then(data => {
          bot.sendMessage(chatId, 'Respuesta del backend (por implementar): ' + data.message);
        })
        .catch(error => {
          bot.sendMessage(chatId, 'Ha habido un error: ', error.message);
        });
    }

  });
}

export default bot;