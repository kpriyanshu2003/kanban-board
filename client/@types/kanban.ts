// import { UniqueIdentifier } from "@dnd-kit/core";
// import { Task } from "./task";

import { Task } from "./task";

// export interface Column {
//   id: UniqueIdentifier;
//   title: string;
// }

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: string;
}

export interface BoardColumnProps {
  column: string;
  tasks: Task[];
  isOverlay?: boolean;
}

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

export interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export type DraggableData = ColumnDragData | TaskDragData;
