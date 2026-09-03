const config = require("./config");

const telegram = {
    botToken: config.telegram.botToken,
    chatId: config.telegram.chatId,
};

module.exports = telegram;