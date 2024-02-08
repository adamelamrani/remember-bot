import type Message from '../../db/messages/entity/Message.entity';
import { MessagesNotFoundError } from '../../db/messages/errors/MessageErrors';
import MessagesRepository from '../../db/messages/repository/MessagesRepository';
import { type BotFunctionsWithRegex } from '../types/BotFunctions';

const messageRepository = new MessagesRepository();

export const getMessagesFrom = async ({
  bot,
  msg,
  chatId,
  match,
}: BotFunctionsWithRegex): Promise<void> => {
  const username =
    match !== null
      ? match[1].includes('@')
        ? match[1].slice(1)
        : match[1]
      : '';

  if (msg.chat.type !== 'private') {
    try {
      const messages = (await messageRepository.getAllMessagesFromUser(
        username,
        chatId,
      )) as Message[];
      messages.forEach(async (message) => {
        await bot.sendMessage(
          chatId,
          `${new Date(message.timestamp).toLocaleString()} - <a href='tg://user?id=${message?.userid}'>${message?.firstName}</a> said: ${message.message}`,
          { parse_mode: 'HTML' },
        );
      });
    } catch (error: unknown) {
      if (error instanceof MessagesNotFoundError) {
        await bot.sendMessage(chatId, error.message);
      } else {
        await bot.sendMessage(chatId, 'There has been an error');
      }
    }
  } else {
    await bot.sendMessage(
      chatId,
      'This command can only be used in a group chat',
    );
  }
};

export const getLastMessageFrom = async ({
  bot,
  msg,
  chatId,
  match,
}: BotFunctionsWithRegex): Promise<void> => {
  const username =
    match !== null
      ? match[1].includes('@')
        ? match[1].slice(1)
        : match[1]
      : '';

  if (msg.chat.type !== 'private') {
    try {
      const message = (await messageRepository.getLastMessageFromUser(
        username,
        chatId,
      )) as Message;
      await bot.sendMessage(
        chatId,
        `${new Date(message.timestamp).toLocaleString()} - <a href='tg://user?id=${message?.userid}'>${message?.firstName}</a> said: ${message.message}`,
        { parse_mode: 'HTML' },
      );
    } catch (error: unknown) {
      if (error instanceof MessagesNotFoundError) {
        await bot.sendMessage(chatId, error.message);
      } else {
        await bot.sendMessage(chatId, 'There has been an error');
      }
    }
  } else {
    await bot.sendMessage(
      chatId,
      'This command can only be used in a group chat',
    );
  }
};
