import { ChatAlreadyExistsError } from '../../db/chats/errors/ChatErrors';
import ChatRepository from '../../db/chats/repository/chatRepository';
import type BotFunctions from '../types/BotFunctions';

export const checkGroup = async ({
  bot,
  msg,
  chatId,
}: BotFunctions): Promise<void> => {
  if (msg.chat.type !== 'private') {
    // Verify if the group exists in the database
    const chat = new ChatRepository();

    try {
      await chat.save({
        chatid: chatId,
        chatname: msg.chat?.title ?? `chat_${chatId}`,
      });
      await bot.sendMessage(
        chatId,
        'Hey! I will remember your messages! Use /help to see the commands!',
      );
    } catch (error: unknown) {
      if (error instanceof ChatAlreadyExistsError) {
        await bot.sendMessage(chatId, error.message);
      } else {
        await bot.sendMessage(chatId, 'There has been an error');
      }
    }
  }
};
