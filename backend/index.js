require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI ({
    apiKey: process.env.GEMINI_API_KEY,
});

// async function main(){
//     const respones =  await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: "Explain Node.js To a beginner"
//     })
//     console.log(respones.text);
// }

// main();

async function askGemini(prompt){
    try{
        const respones =  await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            requestOptions: {
                timeout: 60000,
            },
        });
        return respones.text;
    }catch(error){
        console.log(error);
    }
}

// async function main(){
//     const answer = await askGemini("Explan express.js in simple arabic To a beginner");
//     console.log(answer); 
// }

// main();

module.exports = { askGemini }