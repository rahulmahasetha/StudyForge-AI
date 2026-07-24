require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from the React frontend
app.use(express.json({ limit: '1mb' })); // Parse incoming JSON requests, restricted to 1MB for security

// Routes
const generateRoutes = require('./routes/generate');
app.use('/api/generate', generateRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'StudyForge API is running' });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
