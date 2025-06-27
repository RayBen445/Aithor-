const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const TelegramBot = require("node-telegram-bot-api");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === AI Endpoint ===
app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Something went wrong with AI" });
  }
});

// === Telegram Bot (Webhook Mode) ===
const token = process.env.TELEGRAM_BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL || `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`;

const bot = new TelegramBot(token, { webHook: { port: 3001 } }); // webhook on separate port (optional)
bot.setWebHook(`${WEB_APP_URL}/bot${token}`);

// Handle incoming Telegram messages
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot command: /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Aithor! Tap below to open the AI chat 👇", {
    reply_markup: {
      inline_keyboard: [[{ text: "Open Aithor", web_app: { url: WEB_APP_URL } }]],
    },
  });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Aithor is running at ${WEB_APP_URL}`);
});
