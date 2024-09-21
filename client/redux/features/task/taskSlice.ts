import { Task } from "@/@types/task";
import { createSlice, nanoid } from "@reduxjs/toolkit";

interface TaskInitialState {
  tasks: Task[];
  filter: { status: string; priority: string; dueDate: Date | null };
  sort: {
    key: "Any" | "Status" | "Priority" | "Due Date";
    order: "asc" | "desc";
  };
  current: Task | "create" | null;
  kanbanView: "Status" | "Priority";
}

const initialState: TaskInitialState = {
  tasks: [],
  filter: { status: "All", priority: "All", dueDate: null },
  sort: { key: "Any", order: "asc" },
  current: null,
  kanbanView: "Status",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setKanbanView: (state, action) => {
      state.kanbanView = action.payload;
    },
  },
});

export const { setTasks, setFilter, setSort, setCurrent, setKanbanView } =
  taskSlice.actions;
export default taskSlice.reducer;
