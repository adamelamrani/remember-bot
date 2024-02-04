import { BotFunctionsWithRegex } from "../types/BotFunctions";

export const getMessagesFrom = ({ bot, msg, chatId, match }: BotFunctionsWithRegex) => {

  const username = match ? match[1] : "";

  if (msg.chat.type !== "private") {
    fetch(`${process.env.API_URL}message/${username}/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {

        if (response.ok) {
          return response.json();
        }
        throw new Error('Error making the request');
      })
      .then(data => {

        if (data.messages.length === 0) {
          bot.sendMessage(chatId, `No messages found`);
        }

        if (data.messages.length >= 1) {
          data.messages.forEach((message: any) => {
            bot.sendMessage(chatId, ` ${new Date(message.timestamp).toLocaleString()} - @${message.username} said: ${message.message}`);
          });
        }
      })
      .catch(error => {
        console.log('There has been an error: ', error);
      });
  } else {
    bot.sendMessage(chatId, `This command can only be used in a group chat`);

  }
}


export const getLastMessageFrom = ({ bot, msg, chatId, match }: BotFunctionsWithRegex) => {
  const username = match ? match[1] : "";

  if (msg.chat.type !== "private") {
    fetch(`${process.env.API_URL}message/${username}/${chatId}/last`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error making the request');
      })
      .then(data => {

        if (data.message === null) {
          return bot.sendMessage(chatId, `No messages found`);
        }

        bot.sendMessage(chatId, `${data.message.username} said: ${data.message.message}`);
      })
      .catch(error => {
        console.log('There has been an error: ', error);
      })
  } else {
    bot.sendMessage(chatId, `This command can only be used in a group chat`);
  }
}