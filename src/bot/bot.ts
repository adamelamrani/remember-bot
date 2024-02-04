import TelegramBot, { Message } from "node-telegram-bot-api";
import { AppDataSource } from "../server/serverStart";
import Chat from "../db/chats/entity/ChatsEntity";

const bot = (token: string) => {

  const bot = new TelegramBot(token as string, { polling: true });

  bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;

    if (msg.chat.type !== "private") {
      // Verify if the group exists in the database
      fetch(`${process.env.API_URL}chats/${chatId}`, {
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
              bot.sendMessage(chatId, 'Welcome to the chat! I will remember your messages!');
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
  });

  bot.on('message', async (msg: Message) => {

    const chatId = msg.chat.id;
    const message = msg.text;

    if (message === 'ping') {
      bot.sendMessage(chatId, 'pong');
    }
  });

  bot.onText(/\/remember/, (msg: Message) => {
    const chatId = msg.chat.id;
    const messageToRemember = msg.reply_to_message?.text;
    const messageOwner = msg.reply_to_message?.from;

    const bodyRequest = {
      username: msg.reply_to_message?.from?.username,
      id: require('crypto').randomUUID(),
      message: messageToRemember,
      timestamp: new Date(msg.reply_to_message?.date! * 1000),
      chatid: chatId
    }

    if (msg.chat.type === "private") {
      bot.sendMessage(msg.chat.id, "I will only remember messages from groups");
      return;
    }

    bot.sendMessage(chatId, messageToRemember ? `@${messageOwner?.username} Prepare your annus.` : `Answer with the command "/remember" to the message that you want to remember, bitch!`);

    if (messageToRemember) {
      fetch(`${process.env.API_URL}message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRequest)
      })
        .then(response => {
          if (response.ok) {
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

  });

  bot.onText(/^\/getMessagesFrom (.+)$/, (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id;
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
  });

  bot.onText(/^\/getLastMessageFrom (.+)$/, (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id;
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
      });
  });
}

export default bot;

