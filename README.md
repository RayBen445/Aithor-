# Aithor AI Web App 🤖

Aithor is an AI-powered Telegram Web App that lets users chat with a GPT-based assistant directly inside Telegram. Built using Node.js, Express, and the OpenAI API.

## 🚀 Features

- Chat with AI via a clean Telegram Web App interface
- Backend powered by OpenAI GPT-3.5-Turbo
- Telegram bot integration
- Hosted on Render (frontend + backend)

## 🧰 Tech Stack

- Node.js + Express (backend)
- OpenAI API
- Telegram Bot API
- HTML/CSS/JS (frontend)
- Hosted on Render

## 🔧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/aithor-ai-webapp.git
cd aithor-ai-webapp
```

### 2. Set up environment variables

Create a `.env` file at the root of the project:

```
OPENAI_API_KEY=your_openai_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### 3. Run backend server

```bash
cd backend
npm install
node index.js
```

### 4. Start the Telegram bot

```bash
node bot.js
```

### 5. Deploy frontend

Deploy the `frontend/` folder as a static site on Render or another service.

## 📎 Web App URL

Update `WEB_APP_URL` in `bot.js` with your hosted frontend URL.

## 📝 License

See [LICENSE](./LICENSE) for license details.
