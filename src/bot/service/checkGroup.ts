import ChatRepository from '../../db/chats/repository/chatRepository'
import type BotFunctions from '../types/BotFunctions'

export const checkGroup = async ({ bot, msg, chatId }: BotFunctions): Promise<void> => {
  if (msg.chat.type !== 'private') {
    // Verify if the group exists in the database
    const chat = new ChatRepository();
    const chatResult = await chat.getChatById(chatId)
    console.log(chatResult)
    /* if (chatResult.status === 404) {
      const chatToAdd = await fetch(`${process.env.API_URL}chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatid: chatId, chatname: msg.chat.title })
      })

      if (chatToAdd.status === 201) {
        await bot.sendMessage(chatId, 'Hey! I will remember your messages! Use /help to see the commands!')
      } else {
        await bot.sendMessage(chatId, 'There has been an error adding the chat to the database')
      }

      return
    }

    const chat = await chatResult.json()
    console.log(chat)
    await bot.sendMessage(chatId, 'I am already in this chat!') */
  }
}
