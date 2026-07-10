/**
 * Todo Routes
 * ------------
 * Defines the API endpoints for Todo CRUD operations.
 * All routes are prefixed with /api/todos (set in server.js).
 *
 * Route Map:
 *   GET    /api/todos      → Get all todos
 *   POST   /api/todos      → Create a new todo
 *   PUT    /api/todos/:id  → Update a todo by ID
 *   DELETE /api/todos/:id  → Delete a todo by ID
 */

import { Router } from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

// Create a new Express Router instance
const router = Router();

// ============================================================
// Route Definitions
// ============================================================

/**
 * @route   GET /api/todos
 * @desc    Retrieve all todos from the database
 * @access  Public
 */
router.get("/", getAllTodos);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo item
 * @access  Public
 */
router.post("/", createTodo);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update an existing todo (title and/or completed status)
 * @access  Public
 */
router.put("/:id", updateTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo by its ID
 * @access  Public
 */
router.delete("/:id", deleteTodo);

export default router;
