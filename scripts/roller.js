console.log("Hello World! This code runs immediately when the file is loaded.");



// Register settings entries for the Gemini API key and Gem name
Hooks.once('init', function() {
  game.settings.register('foundry-gem', 'geminiApiKey', {
    name: 'Gemini API Key',
    hint: 'Enter your Gemini API key here. This key is stored locally and not shared.',
    scope: 'world',
    config: true,
    type: String,
    default: '',
    restricted: false
  });
  game.settings.register('foundry-gem', 'geminiGemName', {
    name: 'Gemini Gem Name',
    hint: 'Enter the name of your Gemini Gem (e.g., "Starfinder Player Aid").',
    scope: 'world',
    config: true,
    type: String,
    default: '',
    restricted: false
  });
});

// Helpers to get the Gemini API key and Gem name from settings
function getGeminiApiKey() {
  return game.settings.get('foundry-gem', 'geminiApiKey');
}
function getGeminiGemName() {
  return game.settings.get('foundry-gem', 'geminiGemName') || '';
}

// Register a chat command /gemini
Hooks.on("chatMessage", async (chatLog, message, chatData) => {
  if (!message.startsWith("/gemini ")) return;
  const prompt = message.replace("/gemini ", "");
  const apiKey = getGeminiApiKey();
  const gemName = getGeminiGemName();
  if (!apiKey) {
    ChatMessage.create({ content: '<b>Gemini:</b> <i>No API key set. Please enter your Gemini API key in the module settings.</i>' });
    return false;
  }
  if (!gemName) {
    ChatMessage.create({ content: '<b>Gemini:</b> <i>No Gem name set. Please enter your Gemini Gem name in the module settings.</i>' });
    return false;
  }
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(gemName)}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
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
