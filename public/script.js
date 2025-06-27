async function askAI() {
  const input = document.getElementById("input").value.trim();
  const responseDiv = document.getElementById("response");
  if (!input) {
    responseDiv.innerText = "Please type something first.";
    return;
  }

  responseDiv.innerText = "Thinking... 🤔";

  try {
    const res = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    responseDiv.innerText = data.reply || "No response from Aithor.";
  } catch (err) {
    responseDiv.innerText = "Error talking to Aithor.";
  }
}