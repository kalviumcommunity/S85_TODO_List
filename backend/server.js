const express = require('express');
const connectDB = require('./Database/db');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const port = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes (✅ FIXED PATHS)
const todoRoutes = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");

// Use Routes (✅ FIXED CONFLICT)
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// Database Connection Status
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected to ASAP' : 'Not Connected to ASAP';
  res.json({ dbStatus });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
