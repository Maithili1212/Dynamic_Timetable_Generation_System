require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ── Serve frontend static files ──
// Assuming your frontend files (index.html, etc.) are in the root 'EduFlow' folder
const frontendPath = path.join(__dirname, '..'); 
app.use(express.static(frontendPath));

// ── Routes ──
// Adjusted to match the folder structure in your backend directory
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

// ── SPA Fallback ──
// Use '*' to catch all routes and serve the main index.html
app.use((req, res) => {
    res.status(404).send("Route not found");
});

// ── Database & Server Start ──
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Open your browser at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });