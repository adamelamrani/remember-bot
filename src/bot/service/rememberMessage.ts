import type BotFunctions from '../types/BotFunctions'
import crypto from 'crypto'

export const rememberMessage = async ({ bot, msg, chatId }: BotFunctions): Promise<void> => {
  const messageToRemember = msg.reply_to_message?.text
  const messageOwner = msg.reply_to_message?.from

  const bodyRequest = {
    username: msg.reply_to_message?.from?.username,
    id: crypto.randomUUID(),
    message: messageToRemember,
    timestamp: msg.reply_to_message?.date ?? Date.now(),
    chatid: chatId
  }

  if (msg.chat.type === 'private') {
    await bot.sendMessage(msg.chat.id, 'I will only remember messages from groups')
    return
  }

  await bot.sendMessage(chatId, (messageToRemember != null) ? `@${messageOwner?.username} Prepare your annus.` : 'Answer with the command "/remember" to the message that you want to remember, bitch!')

  if (messageToRemember != null) {
    fetch(`${process.env.API_URL}message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    })
      .then(async response => {
        if (response.ok) {
          return await response.json()
        }
        throw new Error('Error making the request')
      })
      .then(data => {
        console.log(chatId, 'Response from backend: ' + data.message)
      })
      .catch(error => {
        console.log(chatId, 'There has been an error: ', error)
      })
  }
}
