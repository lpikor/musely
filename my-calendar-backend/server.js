const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// MongoDB URI
const mongoURI = 'mongodb://127.0.0.1:27017/calendar';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Event model
const Event = mongoose.model('Event', new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
}));

// Routes
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
  res.json(event);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
