const express = require('express');
const connectDB = require('./db/db');
const mongoose = require('mongoose'); // Import mongoose to check connection status
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/config/.env') });
const app = express();
const port = process.env.PORT || 3000;
connectDB();


app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected to ASAP' : 'Not Connected to ASAP';
  res.json({dbStatus});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
