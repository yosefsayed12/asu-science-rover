require("dotenv").config();

const config = {
    port: process.env.PORT || 3000,
    groq: {
        apiKey: process.env.GROQ_API_KEY,
    },
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
    }
};


module.exports = config;