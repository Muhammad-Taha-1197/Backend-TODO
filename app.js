/**
 * Application Entry Point
 * -------------------------
 * This is the main file that bootstraps the entire backend.
 * It loads environment variables, validates them, connects to
 * MongoDB, and starts the Express server.
 *
 * Flow:
 *   1. Load .env variables via dotenv
 *   2. Validate required env vars with Zod
 *   3. Connect to MongoDB
 *   4. Start the Express server on the configured port
 */

import server from "./server.js";
import { configDotenv } from "dotenv";
import zod from "zod";
import { Connection } from "./config/db.js";

// Load environment variables from .env file into process.env
configDotenv();

/**
 * Environment Variable Validation Schema
 * Ensures PORT is present and is a valid number.
 * zod.coerce.number() converts string values to numbers automatically.
 */
const envSchema = zod.object({
  PORT: zod.coerce.number(),
});

// Parse and validate environment variables (throws if invalid)
const env = envSchema.parse(process.env);
const port = env.PORT;

/**
 * Initialize the application:
 * 1. Connect to MongoDB database
 * 2. Start the Express HTTP server
 */
Connection();

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});