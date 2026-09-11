const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const fishUrl = 'https://api.fish.audio/v1/tts';
const fishApiKey = process.env.FISH_API_KEY;
const fishModel = 's2.1-pro-free';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/tts', async (req, res) => {
  const { text, format = 'mp3', model = fishModel } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  if (!fishApiKey) {
    return res.status(500).json({ error: 'FISH_API_KEY is not configured on the server.' });
  }

  try {
    const response = await fetch(fishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fishApiKey}`
      },
      body: JSON.stringify({
        text,
        format,
        model
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: 'Fish Audio request failed.',
        details: errorText
      });
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(audioBuffer);
  } catch (error) {
    console.error('Fish Audio proxy error:', error);
    return res.status(500).json({
      error: 'Failed to generate audio.',
      details: error.message
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'fish-audio-proxy' });
});

app.listen(PORT, () => {
  console.log(`Fish Audio proxy server running on http://localhost:${PORT}`);
});
