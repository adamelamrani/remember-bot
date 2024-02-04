import { BotFunctionsWithRegex } from "../types/BotFunctions";

export const getMessagesFrom = ({ bot, chatId, match }: BotFunctionsWithRegex) => {

  const username = match ? match[1] : "";

  fetch(`${process.env.API_URL}message/${username}`, {
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
      if (data.messages.length >= 1) {
        data.messages.forEach((message: any) => {
          bot.sendMessage(chatId, ` ${new Date(message.timestamp).toLocaleString()} - @${message.username} said: ${message.message}`);
        });
      }
    })
    .catch(error => {
      console.log('There has been an error: ', error);
    });
}


export const getLastMessageFrom = ({ bot, chatId, match }: BotFunctionsWithRegex) => {
  const username = match ? match[1] : "";

  fetch(`${process.env.API_URL}message/${username}/last`, {
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
      bot.sendMessage(chatId, `${data.message.username} said: ${data.message.message}`);
    })
    .catch(error => {
      console.log('There has been an error: ', error);
    })
}