/**
 * Todo Controller
 * ----------------
 * Contains all the business logic for Todo CRUD operations.
 * Each function is an Express route handler (req, res) => {...}
 * Uses Zod for input validation before database operations.
 */

import Todo from "../models/Todo.js";
import zod from "zod";

// ============================================================
// Zod Validation Schemas
// ============================================================

/**
 * Schema for creating a new todo.
 * - title: must be a non-empty string, trimmed, max 200 characters
 */
const createTodoSchema = zod.object({
  title: zod
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters"),
});

/**
 * Schema for updating an existing todo.
 * - title: optional string (if provided, must be non-empty)
 * - completed: optional boolean
 * At least one field must be provided for an update.
 */
const updateTodoSchema = zod.object({
  title: zod
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .max(200, "Title cannot exceed 200 characters")
    .optional(),
  completed: zod.boolean().optional(),
});

// ============================================================
// Controller Functions
// ============================================================

/**
 * GET /api/todos
 * Fetch all todos from the database, sorted by newest first.
 */
export const getAllTodos = async (req, res) => {
  try {
    // Retrieve all todos, most recent first
    const todos = await Todo.find().sort({ createdAt: -1 });

    // Send the todos array back to the client
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    // Handle any unexpected database errors
    console.error("Error fetching todos:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
      error: error.message,
    });
  }
};

/**
 * POST /api/todos
 * Create a new todo after validating the request body with Zod.
 */
export const createTodo = async (req, res) => {
  try {
    // Validate the incoming data against our Zod schema
    const validatedData = createTodoSchema.parse(req.body);

    // Create a new todo document in MongoDB
    const newTodo = await Todo.create(validatedData);

    // Return the newly created todo with 201 (Created) status
    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    // Check if it's a Zod validation error
    if (error.name === "ZodError") {
      // Extract user-friendly error messages from Zod
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    // Handle other unexpected errors
    console.error("Error creating todo:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: error.message,
    });
  }
};

/**
 * PUT /api/todos/:id
 * Update an existing todo's title and/or completed status.
 * The :id param identifies which todo to update.
 */
export const updateTodo = async (req, res) => {
  try {
    // Validate the update data with Zod
    const validatedData = updateTodoSchema.parse(req.body);

    // Find the todo by ID and apply the updates
    // { new: true } returns the updated document instead of the old one
    // { runValidators: true } ensures Mongoose validators also run
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    // If no todo was found with that ID, return 404
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Return the updated todo
    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    // Check if it's a Zod validation error
    if (error.name === "ZodError") {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    // Handle invalid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID format",
      });
    }

    // Handle other unexpected errors
    console.error("Error updating todo:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/todos/:id
 * Permanently remove a todo from the database.
 */
export const deleteTodo = async (req, res) => {
  try {
    // Find and delete the todo in one operation
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    // If no todo was found with that ID, return 404
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Return the deleted todo data for confirmation
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid todo ID format",
      });
    }

    // Handle other unexpected errors
    console.error("Error deleting todo:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: error.message,
    });
  }
};
