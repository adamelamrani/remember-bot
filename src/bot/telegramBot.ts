import "dotenv/config";
const { Telegraf } = require('telegraf');
import { Context } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
bot.command('oldschool', (ctx: Context) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('Pepo'));

try {
  bot.launch();
  console.log("HOLA BUENAS")
} catch (error) {
  console.log(error)
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));