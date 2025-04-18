// Import necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TeacherProfile = require('./models/TeacherProfile'); // <-- Import model

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Teacher Job Portal Backend!');
});

app.get('/api/jobs', (req, res) => {
  res.json({
    message: 'List of jobs will be here.',
    jobs: []
  });
});

// ⬇️ Save teacher profile
app.post('/api/teacher-profile', async (req, res) => {
  try {
    const newProfile = new TeacherProfile(req.body);
    await newProfile.save();
    res.status(201).json({ message: 'Profile saved successfully', data: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving profile', error: err.message });
  }
});

// ⬇️ Optional: Get all profiles
app.get('/api/teacher-profiles', async (req, res) => {
  try {
    const profiles = await TeacherProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profiles', error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
