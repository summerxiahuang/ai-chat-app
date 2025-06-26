const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Mock responses for testing when API key is invalid or quota exceeded
const mockResponses = [
    "Hello! I'm a mock AI assistant. Your OpenAI API key needs to be configured for real responses.",
    "This is a test response. To get real AI responses, please update your OpenAI API key in the .env file.",
    "I'm here to help! Currently running in demo mode. Set up your API key for full functionality.",
    "Thanks for your message! The app is working correctly - just need to configure the AI service.",
    "Great question! This is a placeholder response while you set up your OpenAI integration.",
    "The chat interface is working perfectly! This is a demo response until you configure your API key.",
    "I can see you're testing the app. Everything looks good on the frontend and backend!",
    "Mock response: The application is fully functional and ready for real AI integration."
];

const getMockResponse = (userMessage) => {
    const index = userMessage.length % mockResponses.length;
    return mockResponses[index];
};

router.post('/chat', async (req, res) => {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    try {
        // Check if we have a valid API key
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key')) {
            // Use mock response
            const lastMessage = messages[messages.length - 1];
            const mockReply = getMockResponse(lastMessage.text);
            return res.json({ 
                reply: mockReply,
                note: "Running in demo mode. Update your OpenAI API key for real AI responses."
            });
        }

        // Convert messages to OpenAI format
        const openaiMessages = messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: openaiMessages,
            max_tokens: 500,
            temperature: 0.7,
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Error in chat route:', error);
        
        // Check for specific error types and provide mock responses
        if (error.code === 'insufficient_quota' || 
            error.message.includes('quota') || 
            error.message.includes('429') ||
            error.message.includes('invalid_api_key') || 
            error.message.includes('401')) {
            
            const lastMessage = messages[messages.length - 1];
            const mockReply = getMockResponse(lastMessage.text);
            return res.json({ 
                reply: mockReply,
                note: "API quota exceeded or invalid key. Running in demo mode. Please check your OpenAI configuration."
            });
        }
        
        // For other errors, still provide a mock response
        const lastMessage = messages[messages.length - 1];
        const mockReply = getMockResponse(lastMessage.text);
        return res.json({ 
            reply: mockReply,
            note: "Error occurred. Running in demo mode. Please check your configuration."
        });
    }
});

module.exports = router;