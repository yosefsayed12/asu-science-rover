const express = require("express");
const {
    sendTelegramMessage
} = require("../services/telegramService");

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        await sendTelegramMessage(
            "🤖 رسالة تجريبية من ASU Science Rover Backend"
        );

        res.json({
            success: true,
            message: "Telegram message sent successfully.",
        });

    } catch (error) {
        console.error("Telegram Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send Telegram message.",
        });
    }
});

module.exports = router;