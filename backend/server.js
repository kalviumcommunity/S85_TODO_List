const express = require('express');
const connectDB = require('./db/db'); // DB Connection

// require('dotenv').config({ path: './config/.env' });
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/config/.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
