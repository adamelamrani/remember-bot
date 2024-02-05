import type Message from '../../db/messages/entity/MessagesEntity';
import { type BotFunctionsWithRegex } from '../types/BotFunctions';

export const getMessagesFrom = async ({ bot, msg, chatId, match }: BotFunctionsWithRegex): Promise<void> => {
  const username = (match !== null) ? match[1] : '';

  if (msg.chat.type !== 'private') {
    fetch(`${process.env.API_URL}message/${username}/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }
        throw new Error('Error making the request');
      })
      .then(async data => {
        if (data.messages.length === 0) {
          await bot.sendMessage(chatId, 'No messages found');
        }

        if (data.messages.length >= 1) {
          data.messages.forEach(async (message: Message) => {
            await bot.sendMessage(chatId, ` ${new Date(message.timestamp).toLocaleString()} - @${message.username} said: ${message.message}`);
          });
        }
      })
      .catch(error => {
        console.log('There has been an error: ', error);
      });
  } else {
    await bot.sendMessage(chatId, 'This command can only be used in a group chat');
  }
}

export const getLastMessageFrom = async ({ bot, msg, chatId, match }: BotFunctionsWithRegex): Promise<void> => {
  const username = (match !== null) ? match[1] : '';

  if (msg.chat.type !== 'private') {
    fetch(`${process.env.API_URL}message/${username}/${chatId}/last`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }
        throw new Error('Error making the request');
      })
      .then(async data => {
        if (data.message === null) {
          return await bot.sendMessage(chatId, 'No messages found');
        }

        await bot.sendMessage(chatId, `${data.message.username} said: ${data.message.message}`);
      })
      .catch(error => {
        console.log('There has been an error: ', error);
      })
  } else {
    await bot.sendMessage(chatId, 'This command can only be used in a group chat');
  }
}
