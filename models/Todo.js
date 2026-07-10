/**
 * Todo Model
 * -----------
 * Mongoose schema and model for Todo documents stored in MongoDB.
 * Each todo has a title, a completed flag, and automatic timestamps.
 */

import mongoose from "mongoose";

/**
 * Todo Schema Definition
 * - title:     The text content of the todo (required, trimmed, max 200 chars)
 * - completed: Whether the todo is done (defaults to false)
 * - timestamps: Mongoose auto-adds createdAt and updatedAt fields
 */
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"], // Custom validation message
      trim: true, // Remove leading/trailing whitespace
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false, // New todos start as incomplete
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

/**
 * Todo Model
 * Compiled from the schema above — used to interact with the "todos" collection.
 */
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
