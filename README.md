# 💬 WhatsApp AI Auto-Reply Bot

A WhatsApp group bot that monitors a specific group and auto-replies with funny, sarcastic responses in Pakistani Roman Urdu/English mix. Powered by Google Gemini 2.5 Flash.

---

## ✨ Features

| Feature | Description |
|---|---|
| 👂 **Group Monitor** | Watches a specific WhatsApp group for new messages |
| 🤖 **AI Replies** | Gemini 2.5 Flash generates short, funny Roman Urdu replies |
| 😂 **Sarcastic Tone** | Replies like Pakistani youth — roasts in a friendly way |
| 🔐 **Session Persistence** | LocalAuth saves your login — no QR scan every time |
| ⏱️ **Human Delay** | 2-second delay before replying to avoid spam detection |
| 🚫 **Self-filter** | Never replies to its own messages |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **WhatsApp:** `whatsapp-web.js` (Puppeteer-based)
- **AI:** Google Gemini 2.5 Flash API
- **HTTP:** `axios`
- **QR Display:** `qrcode-terminal`
- **Browser:** Chrome (headless via Puppeteer)

---

## 📁 Project Structure

```
whatsapp-ai-bot/
├── bot.js              # Main bot — message listener + AI reply
├── package.json        # Node dependencies
└── README.md           # This file
```

---

## 🚀 Setup & Installation

### Step 1 — Clone the Project
```bash
git clone https://github.com/yourusername/whatsapp-ai-bot.git
cd whatsapp-ai-bot
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Install Chrome
Make sure Google Chrome is installed at:
```
C:\Program Files\Google\Chrome\Application\chrome.exe
```
If it's somewhere else, update this line in `bot.js`:
```javascript
executablePath: 'YOUR_CHROME_PATH_HERE'
```

### Step 4 — Add Your Gemini API Key
Get a free key from [Google AI Studio](https://aistudio.google.com)

Open `bot.js` and replace:
```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

### Step 5 — Set Your Group Name
```javascript
const GROUP_NAME = "Your Group Name Here";
```

### Step 6 — Run
```bash
node bot.js
```

Scan the QR code with WhatsApp → **Linked Devices** → **Link a Device**

---

## 🎮 How It Works

1. Bot starts and shows a QR code in terminal
2. Scan with WhatsApp on your phone
3. Bot monitors the specified group
4. When someone sends a message, Gemini generates a short funny reply
5. Bot waits 2 seconds then sends the reply

---

## ⚙️ Configuration

```javascript
const GROUP_NAME = "YOUR-GROUP-NAME";     // Change to your group name
const GEMINI_MODEL = "gemini-2.5-flash"; // AI model
generationConfig: { maxOutputTokens: 100 } // Keep replies short
```

---

## 📦 Dependencies

```json
{
  "whatsapp-web.js": "^1.x",
  "qrcode-terminal": "^0.12.x",
  "axios": "^1.x"
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| QR not showing | Run `node bot.js` again |
| Chrome not found | Update `executablePath` in `bot.js` |
| Bot not replying | Check group name matches exactly |
| Gemini API error | Check your API key |
| Session expired | Delete `.wwebjs_auth` folder and re-scan QR |

---

## ⚠️ Important Notes

- Keep your phone connected to internet while bot is running
- Do not use this for spam — only for fun in your own group
- WhatsApp may temporarily limit accounts that send too many automated messages

---

## 👤 Author

Built with ❤️ using Node.js + Google Gemini AI
