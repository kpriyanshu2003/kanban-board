export interface BResponse {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Task extends BResponse {
  userId: string;
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
