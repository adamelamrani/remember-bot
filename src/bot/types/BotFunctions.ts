import { type Message } from 'node-telegram-bot-api';
import type TelegramBot from 'node-telegram-bot-api';

export default interface BotFunctions {
  bot: TelegramBot;
  msg: Message;
  chatId: number;
}

export interface BotFunctionsWithRegex extends BotFunctions {
  match: RegExpExecArray | null;
}
