const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/messages', async (req, res) => {
    const { channelID, TokenBot } = req.query;

    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${channelID}/messages`, {
            headers: {
                Authorization: `Bot ${TokenBot}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }

        const messages = await response.json();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
