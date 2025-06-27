const chatHistory = [];

function appendMessage(role, text) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${role}`;
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function askAI() {
  const inputBox = document.getElementById("input");
  const prompt = inputBox.value.trim();
  if (!prompt) return;

  // Show user message
  appendMessage("user", prompt);
  chatHistory.push({ role: "user", content: prompt });
  inputBox.value = "";

  // Show bot thinking
  const thinkingMsg = { role: "bot", content: "Thinking..." };
  appendMessage("bot", thinkingMsg.content);
  const botMessages = document.querySelectorAll(".message.bot");

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await res.json();
    const reply = data.reply || "No response.";
    botMessages[botMessages.length - 1].innerText = reply;
    chatHistory.push({ role: "assistant", content: reply });
  } catch (err) {
    botMessages[botMessages.length - 1].innerText = "⚠️ Error contacting Aithor.";
  }
}
