// const { askAI } = require("../services/aiService");


// // ========================================
// // Ask AI
// // ========================================

// async function ask(req, res) {

//     try {

//         const { question } = req.body;


//         // ================================
//         // Validate Question
//         // ================================

//         if (
//             !question ||
//             typeof question !== "string" ||
//             !question.trim()
//         ) {

//             return res.status(400).json({
//                 success: false,
//                 message: "من فضلك اكتب سؤالك.",
//             });
//         }


//         // ================================
//         // Ask AI Service
//         // ================================

//         const result =
//             await askAI(question.trim());


//         // ================================
//         // Send Response
//         // ================================

//         return res.status(200).json({
//             success: true,
//             ...result,
//         });

//     } catch (error) {

//         console.error(
//             "AI Controller Error:",
//             error
//         );

//         return res.status(500).json({
//             success: false,
//             message:
//                 "حصل خطأ أثناء معالجة السؤال.",
//         });
//     }
// }


// module.exports = {
//     ask,
// };

const { askAI } = require("../services/aiService");


// ========================================
// Ask AI
// ========================================

async function ask(req, res) {

    try {

        const { question } = req.body;


        // ================================
        // Validate Question
        // ================================

        if (
            !question ||
            typeof question !== "string" ||
            !question.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "من فضلك اكتب سؤالك.",
            });
        }


        // ================================
        // Prepare Streaming Response
        // ================================

        res.setHeader(
            "Content-Type",
            "text/plain; charset=utf-8"
        );

        res.setHeader(
            "Transfer-Encoding",
            "chunked"
        );

        res.setHeader(
            "Cache-Control",
            "no-cache"
        );

        res.setHeader(
            "Connection",
            "keep-alive"
        );


        // ================================
        // Ask AI Service
        // ================================

        await askAI(
            question.trim(),
            (chunk) => {
                res.write(chunk);
            }
        );


        // ================================
        // End Response
        // ================================

        res.end();

    } catch (error) {

        console.error(
            "AI Controller Error:",
            error
        );

        if (!res.headersSent) {

            return res.status(500).json({
                success: false,
                message:
                    "حصل خطأ أثناء معالجة السؤال.",
            });
        }

        res.end();
    }
}


module.exports = {
    ask,
};