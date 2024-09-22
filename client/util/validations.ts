import { Task, TaskPriority, TaskStatus } from "@/@types/task";

// Create & Update Task
export const validateTask = async (task: Task) => {
  if (!task.title) throw new Error("Please provide a title");
  if (!task.status) throw new Error("Please provide a status");
  if (!task.priority) throw new Error("Please provide a priority");

  if (task.dueDate && new Date(task.dueDate) < new Date())
    throw new Error("Due date should be in the future");

  // if task.status is not one of the enum values
  if (!Object.values(TaskStatus).includes(task.status))
    throw new Error("Invalid status");

  // if task.priority is not one of the enum values
  if (!Object.values(TaskPriority).includes(task.priority))
    throw new Error("Invalid priority");
};
