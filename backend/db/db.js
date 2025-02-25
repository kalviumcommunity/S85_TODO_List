const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });

const dbURL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);

    console.log("🔥 Connected to MongoDB: ASAP_DB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
