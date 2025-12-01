const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false; // Cache connection

const connectDB = async () => {
  if (isConnected) return;

  // If already connected in mongoose connections
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
