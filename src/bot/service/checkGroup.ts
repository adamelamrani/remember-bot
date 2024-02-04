import BotFunctions from "../types/BotFunctions";

export const checkGroup = async ({ bot, msg, chatId }: BotFunctions) => {
  if (msg.chat.type !== "private") {
    // Verify if the group exists in the database
    fetch(`${process.env.API_URL}chat/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.ok) {
        bot.sendMessage(chatId, 'I am already in this chat! I will remember your messages!');
        return;
      } else {
        return fetch(`${process.env.API_URL}chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatid: chatId, chatname: msg.chat.title })
        }).then(response => {
          if (response.ok) {
            bot.sendMessage(chatId, 'Hey! I will remember your messages! Use /help to see the commands!');
            return response.json();
          }
          throw new Error('Error making the request');
        })
          .then(data => {
            console.log(chatId, 'Response from backend: ' + data.message);
          })
          .catch(error => {
            console.log(chatId, 'There has been an error: ', error);
          });
      }
    })
  } else {
    bot.sendMessage(chatId, `Welcome! Add me to a group to save messages and remember them later!`);
  }
}