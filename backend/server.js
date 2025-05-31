const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // ✅ Allow all origins
app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text field is required.' });
  }

  const note = { id: Date.now(), text };
  notes.push(note);
  res.status(201).json(note);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
