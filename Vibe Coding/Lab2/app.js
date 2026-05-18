// --- CONFIGURATION ---
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GROQ_API_KEY;

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

let conversationHistory = [
    { role: "system", content: "You are a helpful artificial intelligence assistant representing NeuroAgent. Be professional, visionary, and concise. IMPORTANT: If the user asks you to generate, create, or draw an image, reply simply with the exact format [IMAGE: <detailed prompt for the image>]. Do not include any other text in your response besides this tag when an image is requested." }
];

// --- DOM ELEMENTS ---
const inputEl = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const chatContainer = document.getElementById('messages-container');
const startChatBtn = document.getElementById('start-chat-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const appContainer = document.getElementById('app-container');
const newChatBtn = document.getElementById('new-chat-btn');

// --- WELCOME SCREEN LOGIC ---
let chatStarted = false;

if (startChatBtn) {
    startChatBtn.addEventListener('click', () => {
        welcomeScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            appContainer.style.animation = 'fadeIn 0.5s ease-out forwards';
            if (!chatStarted) {
                showWelcomeMessage();
                chatStarted = true;
            }
        }, 500);
    });
}

// --- FUNCTIONS ---

function updateUI(text, role) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', role);

    const avatar = document.createElement('img');
    avatar.src = role === 'bot' ? 'ai_avatar.png' : 'user_avatar.png';
    avatar.classList.add('avatar-img');

    const msg = document.createElement('div');
    msg.classList.add('message', role);

    if (role === 'bot' && text.includes('[IMAGE:')) {
        const match = text.match(/\[IMAGE:(.*?)\]/i);
        if (match && match[1]) {
            const prompt = match[1].trim();
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
            msg.innerHTML = `Generating image...<br><img src="${imageUrl}" alt="${prompt}" class="chat-generated-image" onload="this.previousSibling.previousSibling.remove()">`;
        } else {
            msg.innerHTML = formatMessage(text);
        }
    } else {
        msg.innerHTML = formatMessage(text);
    }

    if (role === 'user') {
        wrapper.appendChild(msg);
        wrapper.appendChild(avatar);
    } else {
        wrapper.appendChild(avatar);
        wrapper.appendChild(msg);
    }

    chatContainer.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Auto-speech for bot
    if (role === 'bot' && !text.includes('[IMAGE:')) speakText(text);
}

function formatMessage(text) {
    let formatted = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

function showWelcomeMessage() {
    const welcomeText = "Welcome to AI Studio! I am your NeuroAgent. How can I assist you today? Try asking a question or select one of the recommendations below:";
    conversationHistory.push({ role: "assistant", content: welcomeText });
    updateUI(welcomeText, 'bot');

    const suggestionsWrapper = document.createElement('div');
    suggestionsWrapper.classList.add('suggestions-wrapper');

    const suggestions = [
        "Generate a cyberpunk city image",
        "Explain Neural Networks",
        "Write a Python script",
        "What are your capabilities?"
    ];

    suggestions.forEach(text => {
        const btn = document.createElement('button');
        btn.classList.add('suggestion-btn');
        btn.innerText = text;
        btn.addEventListener('click', () => {
            if (text.startsWith('Generate')) {
                inputEl.value = '/image ' + text.replace('Generate a ', '').replace('Generate ', '');
            } else {
                inputEl.value = text;
            }
            sendMessage();
            suggestionsWrapper.remove();
        });
        suggestionsWrapper.appendChild(btn);
    });

    chatContainer.appendChild(suggestionsWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addTypingIndicator() {
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'typing';
    div.innerText = 'NeuroAgent is typing...';
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

async function callAPI(messages) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("API Error:", error);
        return "Sorry, I'm having trouble connecting to the system right now.";
    }
}

async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    updateUI(text, 'user');

    // Direct image generation shortcut
    if (text.toLowerCase().startsWith('/image ') || text.toLowerCase().startsWith('/imagine ')) {
        const prompt = text.replace(/^\/(image|imagine)\s+/i, '');
        const botResponse = `[IMAGE: ${prompt}]`;
        updateUI(botResponse, 'bot');
        return;
    }

    conversationHistory.push({ role: "user", content: text });

    addTypingIndicator();
    const response = await callAPI(conversationHistory);
    removeTypingIndicator();

    conversationHistory.push({ role: "assistant", content: response });
    updateUI(response, 'bot');
}

// --- VOICE FEATURES ---
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.onstart = () => micBtn.classList.add('pulsing');
    recognition.onend = () => micBtn.classList.remove('pulsing');
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputEl.value = transcript;
        sendMessage();
    };

    micBtn.addEventListener('click', () => recognition.start());
}

// --- EVENT LISTENERS ---
sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        chatContainer.innerHTML = '';
        conversationHistory = [
            { role: "system", content: "You are a helpful artificial intelligence assistant representing NeuroAgent. Be professional, visionary, and concise. IMPORTANT: If the user asks you to generate, create, or draw an image, reply simply with the exact format [IMAGE: <detailed prompt for the image>]. Do not include any other text in your response besides this tag when an image is requested." }
        ];
        showWelcomeMessage();
    });
}