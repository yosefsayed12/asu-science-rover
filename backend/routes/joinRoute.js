const express = require("express");
const { sendTelegramMessage } = require("../services/telegramService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            name,
            phone,
            level,
            program,
            email,
            scouting,
            listen
        } = req.body;

        const message = 
`📝 طلب انضمام جديد

👤 الاسم: ${name}
📱 رقم التليفون: ${phone}
🎓 الفرقة: ${level}
🔬 الشعبة / البرنامج: ${program}
📧 البريد الإلكتروني: ${email}
⛺ شارك في الجوالة / الكشافة قبل كده؟ ${scouting}
📢 سمع عننا منين؟ ${listen}`;

        await sendTelegramMessage(message);

        res.status(200).json({
            success: true,
            message: "تم إرسال طلب الانضمام بنجاح."
        });

    } catch (error) {
        console.error("Join Form Error:", error);

        res.status(500).json({
            success: false,
            message: "حصل خطأ أثناء إرسال طلب الانضمام."
        });
    }
});

module.exports = router;