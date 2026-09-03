const groq = require("../config/groq");
const { searchKnowledge } = require("./searchService");
const systemPrompt = require("../prompts/systemPrompt");

// ========================================
// Settings
// ========================================

const MODEL = "openai/gpt-oss-120b";


// ========================================
// Conversational Questions
// ========================================

function isConversationalQuestion(question) {
    console.log("Checking Conversational question: ", question);

    const normalizedQuestion =
        question
            .toLowerCase()
            .trim();

    const conversationalPatterns = [
        "اسمك ايه",
        "اسمك إيه",
        "مين انت",
        "مين إنت",
        "انت مين",
        "إنت مين",
        "ازيك",
        "إزيك",
        "اهلا",
        "أهلا",
        "مرحبا",
        "شكرا",
        "شكراً",
    ];

    return conversationalPatterns.some(
        (pattern) =>
            normalizedQuestion.includes(pattern)
    );
}


// ========================================
// Ask AI - Streaming
// ========================================

async function askAI(question, onChunk) {
    console.log("ASK AI: ", question);

    try {

        // ====================================
        // 1. Conversational Question
        // ====================================

        if (isConversationalQuestion(question)) {
            console.log("CONVERSATIONAL QUESTION");

            const stream =
                await groq.chat.completions.create({
                    model: MODEL,

                    messages: [
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        {
                            role: "user",
                            content: question,
                        },
                    ],

                    stream: true,
                });

            for await (const chunk of stream) {
                const text =
                    chunk.choices[0]?.delta?.content;

                if (text) {
                    onChunk(text);
                }
            }

            return;
        }


        // ====================================
        // 2. Search Knowledge Base
        // ====================================

        const searchResult =
            await searchKnowledge(question);


        // ====================================
        // 3. No Reliable Information
        // ====================================

        if (!searchResult.found) {

            onChunk(
                'معلش، معنديش معلومات كافية عن النقطة دي حاليًا. لو سؤالك متعلق بالكلية أو عشيرة الجوالة، تقدر تتواصل معانا من قسم "تواصل معنا"، وإحنا هنساعدك ❤️'
            );

            return;
        }


        // ====================================
        // 4. Prepare Knowledge Context
        // ====================================

        const knowledgeContext =
            searchResult.results
                .map((result) => {

                    return `Category: ${result.category} Source: ${result.file} ${result.content}`;

                })
                .join("\n--------------------\n");


        // ====================================
        // 5. Create Prompt
        // ====================================

        const prompt = `Knowledge Context:${knowledgeContext}
--------------------User Question:${question}`;


        // ====================================
        // 6. Ask Groq - Streaming
        // ====================================

        const stream =
            await groq.chat.completions.create({

                model: MODEL,

                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                stream: true,
            });

            // ====================================
        // 7. Send Chunks
        // ====================================

        for await (const chunk of stream) {

            const text =
                chunk.choices[0]?.delta?.content;

            if (text) {
                onChunk(text);
            }
        }

    } catch (error) {

        console.log("====== GROQ ERROR ======");
        console.error(error);
        console.log("========================");

        throw error;
    }
}


module.exports = {
    askAI,
};