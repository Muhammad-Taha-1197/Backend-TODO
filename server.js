/**
 * Express Server Configuration
 * ------------------------------
 * Sets up the Express application with all necessary middleware
 * and mounts the API routes.
 *
 * Middleware:
 *   - cors()          → Allows cross-origin requests from the frontend
 *   - express.json()  → Parses incoming JSON request bodies
 *
 * Routes:
 *   - /api/todos      → All todo CRUD operations
 */

import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

// Create the Express application instance
const server = express();

// ============================================================
// Middleware Configuration
// ============================================================

/**
 * Enable CORS (Cross-Origin Resource Sharing)
 * This allows the React frontend (running on a different port)
 * to communicate with this backend API.
 */
server.use(cors());

/**
 * Parse JSON request bodies
 * This middleware automatically parses incoming requests with
 * JSON payloads and makes the data available on req.body
 */
server.use(express.json());

// ============================================================
// Route Mounting
// ============================================================

/**
 * Mount todo routes at /api/todos
 * All CRUD endpoints are handled by the todoRoutes router.
 */
server.use("/api/todos", todoRoutes);

export default server;