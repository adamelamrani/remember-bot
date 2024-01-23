import "dotenv/config";
const statusSelector = require('../utils/statusSelector');
const { Telegraf } = require('telegraf');
import { Context } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
bot.command('oldschool', (ctx: Context) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('actualizaçao'));

try {
  bot.launch();
  console.log(statusSelector(200)(`Telegram bot is running`));
} catch (error) {
  console.log(statusSelector(500)(`Telegram bot is not running`) + error);
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));