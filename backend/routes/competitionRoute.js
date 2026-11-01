const express = require("express");
const { sendTelegramMessage } = require("../services/telegramService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            eventId,
            name,
            phone,
            academicYear,
            program,
            isMember,
            college
        } = req.body;

        const message = 
`📝 طلب تسجيل مسابقة جديد

نوع المسابقة: ${eventId}
👤 الاسم: ${name}
📱 رقم التليفون: ${phone}
🎓 الفرقة: ${academicYear}
🔬 الشعبة / البرنامج: ${program}
📧 لكلية : ${college}
⛺ فرد في العشيرة :${isMember}
 `;

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