const express = require('express');
// const connectDB = require('./db/db'); // Import DB connection
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
// connectDB();

// Basic /ping route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


