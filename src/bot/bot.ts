import TelegramBot, { type Message } from 'node-telegram-bot-api';
import { checkGroup } from './service/checkGroup';
import { rememberMessage } from './service/rememberMessage';
import { getLastMessageFrom, getMessagesFrom } from './service/getMessages';

const bot = (token: string): void => {
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, async (msg: Message) => {
    const chatId = msg.chat.id;
    await checkGroup({ bot, msg, chatId });
  });

  bot.on('text', async (msg: Message) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    if (message === 'ping') {
      await bot.sendMessage(chatId, 'pong');
    }
  });

  bot.onText(/\/remember/, async (msg: Message) => {
    const chatId = msg.chat.id;
    await rememberMessage({ bot, msg, chatId });
  });

  bot.onText(
    /^\/getMessagesFrom @(\S+)$/,
    async (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      await getMessagesFrom({ bot, msg, chatId, match });
    },
  );

  bot.onText(
    /^\/getLastMessageFrom @(\S+)$/,
    async (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      await getLastMessageFrom({ bot, msg, chatId, match });
    },
  );

  bot.onText(/\/help/, async (msg: Message) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(
      chatId,
      `
    Commands:
      /start - Start the bot
      /remember - Remember the message
      /getMessagesFrom @username - Get all messages from a user
      /getLastMessageFrom @username - Get last message from user
      /help - Show this message`,
    );
  });
};

export default bot;
