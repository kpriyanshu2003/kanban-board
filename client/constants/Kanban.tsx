import { TaskPriority, TaskStatus } from "@/@types/task";

export const StatusColumns = [
  TaskStatus.ToDo,
  TaskStatus.InProgress,
  TaskStatus.Completed,
];

export const PriorityColumns = [
  TaskPriority.Low,
  TaskPriority.Medium,
  TaskPriority.High,
];
