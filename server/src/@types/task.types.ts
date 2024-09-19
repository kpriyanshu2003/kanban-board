import { Types } from "mongoose";

export interface Task {
  userId: Types.ObjectId;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
}

export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}
