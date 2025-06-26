const express = require('express');
const Conversation = require('../models/Conversation');
const router = express.Router();

// Get all conversations
router.get('/conversations', async (req, res) => {
    try {
        const conversations = await Conversation.find()
            .sort({ updatedAt: -1 })
            .limit(50);
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

// Get a specific conversation
router.get('/conversations/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.json(conversation);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
});

// Save a new conversation
router.post('/conversations', async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        const conversation = new Conversation({ messages });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        console.error('Error saving conversation:', error);
        res.status(500).json({ error: 'Failed to save conversation' });
    }
});

// Update an existing conversation
router.put('/conversations/:id', async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        const conversation = await Conversation.findByIdAndUpdate(
            req.params.id,
            { messages },
            { new: true, runValidators: true }
        );

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (error) {
        console.error('Error updating conversation:', error);
        res.status(500).json({ error: 'Failed to update conversation' });
    }
});

// Delete a conversation
router.delete('/conversations/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndDelete(req.params.id);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
});

module.exports = router; 