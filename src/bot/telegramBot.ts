import "dotenv/config";
import statusSelector from "../utils/statusSelector";
import { Telegraf } from "telegraf";
import { Context } from "telegraf";
import { message } from 'telegraf/filters'

interface MessageToSave {
  username: string;
  message: string;
  date: number;

}

const saveMessage = (ctx: Context): MessageToSave => {
  const messageToSave: MessageToSave = {
    //@ts-ignore
    username: ctx.message?.reply_to_message.from.username as string,
    //@ts-ignore
    message: ctx.message.reply_to_message.text as string,
    //@ts-ignore
    date: ctx.message.reply_to_message.date as number,
  }
  console.log(messageToSave);
  return messageToSave;
}



const bot = new Telegraf(process.env.TELEGRAM_API_KEY as string);
bot.command('oldschool', (ctx: Context) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('actualizaçao'));
bot.help((ctx: Context) => ctx.reply('Send me a sticker')); //answers to /help

//@ts-ignore
bot.command("remember", (ctx: Context) => { saveMessage(ctx) }); //answers to /remember and saves the data
bot.on(message('text'), async (ctx) => {
  //@ts-ignore
  if (ctx.message.reply_to_message?.text) {
    //@ts-ignore
    await ctx.reply(`Replied to message "${ctx.message.reply_to_message.text}" with: ${ctx.message.text}`)
  } else {
    await ctx.reply(`You said: ${ctx.message.text}`)
  }

  // console.log(ctx.update.message.from.username) //username
  // console.log(ctx.message.text) //message
  // console.log(ctx.message.date) //date
})

try {
  bot.launch();
  console.log(statusSelector(200)(`Telegram bot is running`));
} catch (error) {
  console.log(statusSelector(500)(`Telegram bot is not running`) + error);
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));