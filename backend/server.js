const express = require('express');
const connectDB = require('./db/db');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(express.json());

// Import Routes (✅ FIXED PATHS)
const todoRoutes = require("./Routess/todoRoutes");
const userRoutes = require("./Routess/userRoutes");

// Use Routes (✅ FIXED CONFLICT)
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// Ping Route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Database Connection Status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected to ASAP' : 'Not Connected to ASAP';
  res.json({ dbStatus });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
