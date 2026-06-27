const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios  = require('axios');

const GEMINI_API_KEY = "AIzaSyChxgY9EqWldA28QJ9d71CcMmeFq-hP90Y";
const GEMINI_MODEL   = "gemini-2.5-flash";
const GROUP_NAME     = "New haram gc";

async function getAIResponse(chatHistory) {
    try {
        const prompt = `You are a member of a WhatsApp group called 'New haram gc'.
You speak in Roman Urdu and English mix like Pakistani youth.
You are funny, sarcastic and roast people in a friendly way.
Read the chat and write ONE short reply (1-2 lines only).
Just write the message only, no name no timestamp nothing extra.

Chat:
${chatHistory}

Reply:`;

        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 100 }
            },
            { timeout: 15000 }
        );
        return res.data.candidates[0].content.parts[0].text.trim();
    } catch (e) {
        console.log("[AI ERROR]", e.message);
        return null;
    }
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        protocolTimeout: 60000,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1280,720'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('\n📱 QR Code scan karo WhatsApp se:\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('\n✅ Bot ready! New haram gc monitor kar raha hun...\n');
});

client.on('message', async (msg) => {
    try {
        if (!msg.from.endsWith('@g.us')) return;
        const chat = await msg.getChat();
        if (!chat.name.toLowerCase().includes(GROUP_NAME.toLowerCase())) return;
        if (msg.fromMe) return;

        console.log(`[MSG] ${chat.name}: ${msg.body}`);

        // simple history — sirf last message use karo
        const history = `Someone said: ${msg.body}`;

        console.log('[BOT] AI reply generate kar raha hai...');
        const response = await getAIResponse(history);

        if (response) {
            await new Promise(r => setTimeout(r, 2000));
            await chat.sendMessage(response);
            console.log(`[SENT] ${response}`);
        }
    } catch (e) {
        console.log('[ERROR]', e.message);
    }
});

console.log('='.repeat(50));
console.log('  WHATSAPP AUTO REPLY BOT');
console.log(`  Group: ${GROUP_NAME}`);
console.log('  Ctrl+C to stop');
console.log('='.repeat(50));

client.initialize();