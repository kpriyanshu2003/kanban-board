import Task from "../models/task.models";
import { Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { CustomRequest } from "../@types/index.types";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user.models";
import { startSession } from "mongoose";

const createTask = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { title, description, status, priority, dueDate } = req.body;
  if (!req.user)
    return res.send(new ApiResponse(401, "No token, authorization denied"));
  if (!title || !status || !priority)
    return res.send(new ApiResponse(400, "Please fill in all fields"));

  // Start a session to handle transactions
  const session = await startSession();
  session.startTransaction();

  const task = new Task({
    userId: req.user.id,
    title,
    description,
    status,
    priority,
    dueDate,
  });

  await task.save({ session });
  await User.findByIdAndUpdate(
    req.user.id,
    { $push: { task: task._id } },
    { session }
  );

  await session.commitTransaction();
  session.endSession();

  res.send(new ApiResponse(201, "Task created successfully"));
});

const getTasks = asyncHandler(async (req: CustomRequest, res: Response) => {
  if (!req.user)
    return res.send(new ApiResponse(401, "No token, authorization denied"));

  const tasks = await Task.find({ userId: req.user.id }).select(
    "-userId -__v -createdAt -updatedAt"
  );

  res.send(new ApiResponse(200, "Tasks fetched successfully", tasks));
});

const getTaskById = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  if (!req.user)
    return res.send(new ApiResponse(401, "No token, authorization denied"));
  if (!id) return res.send(new ApiResponse(400, "Please provide a task ID"));

  const task = await Task.find({ _id: id, userId: req.user.id }).select(
    "-userId -__v -createdAt -updatedAt"
  );
  if (!task) return res.send(new ApiResponse(404, "Task not found"));

  res.send(new ApiResponse(200, "Task fetched successfully", task));
});

const updateTask = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  if (!req.user)
    return res.send(new ApiResponse(401, "No token, authorization denied"));
  if (!id) return res.send(new ApiResponse(400, "Please provide a task ID"));

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { title, description, status, priority, dueDate },
    { new: true }
  );

  if (!updatedTask) return res.send(new ApiResponse(404, "Task not found"));
  res.send(new ApiResponse(200, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  if (!req.user)
    return res.send(new ApiResponse(401, "No token, authorization denied"));
  if (!id) return res.send(new ApiResponse(400, "Please provide a task ID"));

  const session = await startSession();
  session.startTransaction();

  const deletedTask = await Task.findByIdAndDelete(id, { session });
  if (!deletedTask) {
    await session.abortTransaction();
    session.endSession();
    return res.status(404).send(new ApiResponse(404, "Task not found"));
  }

  await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { task: id } },
    { session }
  );

  await session.commitTransaction();
  session.endSession();

  res.send(new ApiResponse(200, "Task deleted successfully"));
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
