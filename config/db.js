/**
 * Database Connection
 * ---------------------
 * Establishes a connection to MongoDB using Mongoose.
 * The connection URL is read from the MONGO_URL environment variable.
 * The database name "todoApp" is appended to the connection string.
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB
 * Uses the MONGO_URL from .env and connects to the "todoApp" database.
 * Logs success or failure to the console.
 */
let isConnected;

export const Connection = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URL}/todoApp`);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // Throw instead of process.exit for serverless compatibility
  }
};