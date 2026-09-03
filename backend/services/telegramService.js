const telegram = require("../config/telegram");

async function sendTelegramMessage(message) {
    const url =
        `https://api.telegram.org/bot${telegram.botToken}/sendMessage`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: telegram.chatId,
            text: message,
        }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
        throw new Error(
            data.description || "Telegram API error"
        );
    }

    return data;
}

module.exports = {
    sendTelegramMessage,
};