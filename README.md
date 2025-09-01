# Foundry VTT Module: Foundry Gem

This is a Foundry Virtual Tabletop (VTT) module named `foundry-gem`.

## Structure
- `module.json`: Module manifest file (required by Foundry VTT)
- `scripts/roller.js`: Gemini-powered chat command integration
- `templates/`: Placeholder for HTML templates
- `styles/`: Placeholder for CSS styles
- `packs/`: Placeholder for compendium packs
- `lang/en.json`: Placeholder for localization strings


## Getting Started
1. Place the `foundry-gem` folder in your Foundry VTT `Data/modules` directory.
2. Enable the module in Foundry VTT setup (it will appear as "Foundry Gem").
3. Use the /gemini chat command to interact with Gemini.

## API Key Security & Local Setup

**Never commit your Gemini API key to GitHub.**

To use the Gemini integration:
1. Open `scripts/roller.js` in your local copy of the module.
2. Replace the placeholder `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.
3. Save the file.
4. Do NOT commit or push your real API key to GitHub.

If you update from GitHub, you may need to re-add your API key locally.

**For contributors:**
- Always keep the placeholder in the code when pushing to GitHub.
- Add your real key only to your local copy.

## Customization
Replace placeholder files with your own content as needed.

---

This project follows the [Foundry VTT module development guide](https://foundryvtt.com/article/module-development/).
