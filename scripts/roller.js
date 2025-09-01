console.log("Hello World! This code runs immediately when the file is loaded.");

// Gemini API integration for Foundry VTT chat commands
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Insert your Gemini API key here for local development
const GEMINI_GEM_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/Starfinder Player Aid:generateContent?key=" + GEMINI_API_KEY; // Replace YOUR_GEM

// Register a chat command /gemini
Hooks.on("chatMessage", async (chatLog, message, chatData) => {
  if (!message.startsWith("/gemini ")) return;
  const prompt = message.replace("/gemini ", "");
  const response = await fetch(GEMINI_GEM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  const data = await response.json();
  let html = "<b>Gemini:</b> ";
  if (data.candidates && data.candidates.length > 0) {
    const parts = data.candidates[0].content.parts;
    for (const part of parts) {
      if (part.text) html += `<div>${part.text}</div>`;
      if (part.inlineData && part.inlineData.mimeType && part.inlineData.data) {
        // Assume image/png or image/jpeg
        html += `<img src='data:${part.inlineData.mimeType};base64,${part.inlineData.data}' style='max-width:300px;' />`;
      }
    }
  } else {
    html += "<i>No response from Gemini.</i>";
  }
  ChatMessage.create({ content: html });
  return false; // Prevent normal chat handling
});

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
});
