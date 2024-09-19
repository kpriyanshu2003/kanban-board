import mongoose, { Schema } from "mongoose";
import { Task, TaskPriority, TaskStatus } from "../@types/task.types";

const TaskSchema = new Schema<Task>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.ToDo,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.Low,
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
