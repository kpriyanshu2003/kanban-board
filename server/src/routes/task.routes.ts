import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = express.Router();

// POST /api/tasks
// @desc Create a new task
router.post("/", createTask);

// GET /api/tasks
// @desc Get all tasks
router.get("/", getTasks);

// GET /api/tasks/:id
// @desc Get a task by ID
router.get("/:id", getTaskById);

// PUT /api/tasks/:id
// @desc Update a task by ID
router.patch("/:id", updateTask);

// DELETE /api/tasks/:id
// @desc Delete a task by ID
router.delete("/:id", deleteTask);

export default router;
