const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const TelegramBot = require("node-telegram-bot-api");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const WEB_APP_URL = process.env.WEB_APP_URL || "https://your-app-name.onrender.com";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Aithor! Tap below to open the AI chat 👇", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open Aithor", web_app: { url: WEB_APP_URL } }]],
    },
  });
});

app.listen(port, () => {
  console.log(`Server and bot running on http://localhost:${port}`);
});
