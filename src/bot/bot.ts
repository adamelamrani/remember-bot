import TelegramBot, { Message } from "node-telegram-bot-api";
import { checkGroup } from "./service/checkGroup";
import { rememberMessage } from "./service/rememberMessage";
import { getLastMessageFrom, getMessagesFrom } from "./service/getMessages";

const bot = (token: string) => {

  const bot = new TelegramBot(token as string, { polling: true });

  bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;
    checkGroup({ bot, msg, chatId });

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
    rememberMessage({ bot, msg, chatId });
  });

  bot.onText(/^\/getMessagesFrom (.+)$/, (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id;
    getMessagesFrom({ bot, msg, chatId, match });
  });

  bot.onText(/^\/getLastMessageFrom (.+)$/, (msg: Message, match: RegExpExecArray | null) => {
    const chatId = msg.chat.id;
    getLastMessageFrom({ bot, msg, chatId, match });
  });

  bot.onText(/\/help/, (msg: Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
    Commands:
      /start - Start the bot
      /remember - Remember the message
      /getMessagesFrom username - Get all messages from a user
      /getLastMessageFrom username - Get last message from user
      /help - Show this message`
    );
  });
}

export default bot;

