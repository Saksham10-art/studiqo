const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
const Chat = require('../models/Chat');
const auth = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
  baseURL: 'https://text.pollinations.ai/openai',
});



// Get all chats for a user
router.get('/history', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).select('-messages').sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get specific chat
router.get('/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user.id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create new chat or add message
router.post('/message', auth, async (req, res) => {
  try {
    const { chatId, message, isOffline, mode } = req.body; // mode: normal, teacher, exam
    
    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    } else {
      chat = new Chat({ userId: req.user.id, title: message.substring(0, 30) });
    }

    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    chat.messages.push({ role: 'user', content: message });

    let assistantResponse = '';

    // Online logic using Pollinations free API
    try {
      let systemPrompt = "You are a helpful study assistant.";
      if (mode === 'teacher') systemPrompt = "Explain concepts like a friendly teacher using analogies.";
      if (mode === 'exam') systemPrompt = "Give concise, direct, fact-based answers suitable for exam revision.";
      if (chat.pdfContext) {
        systemPrompt += ` Use the following document context to answer questions: ${chat.pdfContext.substring(0, 3000)}`; // limit context size
      }

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...chat.messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const completion = await openai.chat.completions.create({
        model: "openai",
        messages: apiMessages,
      });

      assistantResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";
    } catch (apiErr) {
      console.error('OpenAI Error:', apiErr);
      assistantResponse = "Online API failed. " + apiErr.message;
    }

    chat.messages.push({ role: 'assistant', content: assistantResponse });
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Upload PDF to a chat
router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    const data = await pdfParse(req.file.buffer);
    const extractedText = data.text;

    let chat = new Chat({ 
      userId: req.user.id, 
      title: req.file.originalname,
      pdfContext: extractedText 
    });
    chat.messages.push({ role: 'assistant', content: `I've processed the document "${req.file.originalname}". How can I help you study it?` });
    
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

module.exports = router;
