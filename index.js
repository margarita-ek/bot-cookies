const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();
const { signs } = require("./options");
const { predictions } = require("./predictions.json");
const { stickers } = require("./stickers.json");
const { compliments } = require("./compliments.json");
const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

const getRandom = (num) => {
    return Math.floor(Math.random() * (num + 1));
};

const startGetSingns = async (chatId) => {
    const randomSticker = getRandom(stickers.length);
    const randomNumber = getRandom(predictions.length);
    await bot.sendSticker(chatId, stickers[randomSticker]);
    await bot.sendMessage(chatId, predictions[randomNumber], signs);
};

const start = () => { 
    bot.setMyCommands([
        { command: "/startcookie", description: "Начать" },
        { command: "/infocookie", description: "Информация" },
        { command: "/signs", description: "Знаки Вселенной" },
    ]);

    bot.on("message", async (msg) => {
        console.log("msg", msg);
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === "/startcookie") { 
            await bot.sendSticker(chatId, "CAACAgIAAxkBAAIctmSIwIXErJi5_WAULICgNCUzx4VLAAImGgACmajIS0DvEn-GtzdqLwQ");
            return bot.sendMessage(chatId, `Вселенная на связи 💞😉`, signs);
        };
        if (text === "/infocookie") { 
            const randomCompliment = getRandom(compliments.length);
            await bot.sendSticker(chatId, "CAACAgIAAxkBAAIcUGSIvh9A_BN1LFxsGoAqTqwBN1DpAAIZFgACerrIS3hkuqvwkenQLwQ");
            return bot.sendMessage(chatId, `Звезды говорят, что ${compliments[randomCompliment]}, а этот бот просто спинномозговая дрочилка, нацеленная исключительно на веселье 🤪`);
        };
        if (text === "/signs") { 
            return startGetSingns(chatId);
        };
        await bot.sendMessage(chatId, "Я тебя не понимаю");
        return bot.sendSticker(chatId, "CAACAgIAAxkBAAIcyGSIwJeVYuvAhVZicMMibzmWbr_lAALaIQAChVZ5SqdvbPPIjxwjLwQ");
    });

    bot.on("callback_query", async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === "/signs") {
            return startGetSingns(chatId);
        };
    });
};

start();