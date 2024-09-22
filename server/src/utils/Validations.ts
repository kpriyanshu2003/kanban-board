import { Task, TaskPriority, TaskStatus } from "../@types/task.types";

export const validateTask = (task: Task) => {
  if (!task.title) throw new Error("Title is required");
  if (!task.status) throw new Error("Status is required");
  if (!task.priority) throw new Error("Priority is required");

  if (task.dueDate && new Date(task.dueDate) < new Date())
    throw new Error("Due date must be in the future");

  // if task.status is not one of the enum values
  if (!Object.values(TaskStatus).includes(task.status))
    throw new Error("Invalid status");

  // if task.priority is not one of the enum values
  if (!Object.values(TaskPriority).includes(task.priority))
    throw new Error("Invalid priority");
};
