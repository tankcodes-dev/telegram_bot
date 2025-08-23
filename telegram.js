require("dotenv").config();
const axios = require("axios");

async function sendMessage(msg) {
    const url = process.env.TELEGRAM_URL;
    await axios.post(url, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: msg,
    });
}

module.exports = sendMessage;
