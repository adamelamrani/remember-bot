import BotFunctions from "../types/BotFunctions";

export const rememberMessage = async ({ bot, msg, chatId }: BotFunctions) => {
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
}