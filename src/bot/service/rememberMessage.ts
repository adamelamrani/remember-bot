/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type Message from '../../db/messages/entity/Message.entity'
import MessagesRepository from '../../db/messages/repository/MessagesRepository'
import type BotFunctions from '../types/BotFunctions'
import crypto from 'crypto'

export const rememberMessage = async ({ bot, msg, chatId }: BotFunctions): Promise<void> => {
  const messageToRemember = msg.reply_to_message?.text
  const messageOwner = msg.reply_to_message?.from
  const messageRepository = new MessagesRepository();

  if (msg.chat.type === 'private') {
    await bot.sendMessage(msg.chat.id, 'I will only remember messages from groups')
    return
  }

  if (messageToRemember === null || messageToRemember === undefined) {
    await bot.sendMessage(chatId, 'Answer with the command "/remember" to the message that you want to remember!')
    return
  }

  try {
    const bodyRequest: Message = {
      username: msg.reply_to_message?.from?.username!,
      id: crypto.randomUUID(),
      message: messageToRemember,
      timestamp: new Date(msg.reply_to_message?.date! * 1000),
      chatid: chatId
    }

    await messageRepository.save(bodyRequest)
    await bot.sendMessage(chatId, `@${messageOwner?.username} Prepare your annus.`)
  } catch (error) {
    await bot.sendMessage(chatId, 'There has been an error saving the message')
  }
}
