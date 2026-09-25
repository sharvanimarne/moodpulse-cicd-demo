const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const VALID_MOODS = ['great', 'good', 'okay', 'confused', 'bad'];

// In-memory store: { sessionId: [{ mood, comment, timestamp }] }
const store = {};

function resetStore() {
  Object.keys(store).forEach((key) => delete store[key]);
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Submit a mood anonymously for a session
app.post('/api/mood', (req, res) => {
  const { sessionId, mood, comment } = req.body || {};

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId is required' });
  }
  if (!VALID_MOODS.includes(mood)) {
    return res.status(400).json({ error: `mood must be one of ${VALID_MOODS.join(', ')}` });
  }

  if (!store[sessionId]) {
    store[sessionId] = [];
  }

  store[sessionId].push({
    mood,
    comment: typeof comment === 'string' ? comment.slice(0, 280) : '',
    timestamp: new Date().toISOString(),
  });

  return res.status(201).json({ message: 'Mood recorded anonymously' });
});

// Aggregated mood data for a session (dashboard)
app.get('/api/moods/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const entries = store[sessionId] || [];

  const counts = VALID_MOODS.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
  entries.forEach((e) => {
    counts[e.mood] += 1;
  });

  const comments = entries.filter((e) => e.comment).map((e) => ({
    comment: e.comment,
    timestamp: e.timestamp,
  }));

  res.status(200).json({
    sessionId,
    totalResponses: entries.length,
    counts,
    comments,
  });
});

module.exports = { app, resetStore, VALID_MOODS };

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`MoodPulse server running on port ${PORT}`);
  });
}
