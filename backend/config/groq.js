const Groq = require("groq-sdk");
const config = require("./config");

const groq = new Groq({
    apiKey: config.groq.apiKey,
});

module.exports = groq;