import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";

import { TaskCard } from "./Card";
import { Task, TaskPriority, TaskStatus } from "@/@types/task";
import { createPortal } from "react-dom";
import { RootState } from "@/redux/store";
import { hasDraggableData } from "../../util/kanban";
import { BoardColumn, BoardContainer } from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PriorityColumns, StatusColumns } from "@/constants/Kanban";
import { setTasks } from "@/redux/features/task/taskSlice";
import { useEffect, useState } from "react";
import { getTasks } from "@/actions/task";

export function KanbanBoard() {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.task.kanbanView);
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const [columns, setColumns] = useState<string[]>(
    view === "Status" ? StatusColumns : PriorityColumns
  );
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(
    () => setColumns(view === "Status" ? StatusColumns : PriorityColumns),
    [view]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        dispatch(setTasks(data.data));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columns}>
          {columns.map((col) => (
            <BoardColumn
              key={col}
              column={col}
              tasks={tasks.filter((task) => {
                if (view === "Status") return task.status === col;
                return task.priority === col;
              })}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter((task) => {
                  if (view === "Status") return task.status === activeColumn;
                  return task.priority === activeColumn;
                })}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === "Column") return setActiveColumn(data.column);
    if (data?.type === "Task") return setActiveTask(data.task);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;
    const activeData = active.data.current;
    if (activeId === overId) return;
    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col === activeId);
      const overColumnIndex = columns.findIndex((col) => col === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    // Handle task over task (reorder)
    // TODO : add an api call to update the task order
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const overIndex = tasks.findIndex((t) => t._id === overId);

      if (activeIndex === -1 || overIndex === -1) return; // Ensure valid indices

      const activeTask = tasks[activeIndex];
      const overTask = tasks[overIndex];

      if (activeTask && overTask && activeTask !== overTask) {
        let updatedTasks = [...tasks]; // Create a shallow copy to avoid direct mutation

        if (view === "Status") {
          updatedTasks[activeIndex] = {
            ...activeTask,
            status: overTask.status,
          };
        } else {
          updatedTasks[activeIndex] = {
            ...activeTask,
            priority: overTask.priority,
          };
        }

        updatedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
        dispatch(setTasks(updatedTasks));
      }
    }

    // Handle task over column (change task status or priority based on the view)
    // TODO : add an api call to update the task status or priority
    if (isActiveATask && isOverAColumn) {
      let tempTask: Task;
      const activeIndex = tasks.findIndex((t) => t._id === activeId);
      const activeTask = tasks[activeIndex];

      if (activeTask) {
        if (view === "Status")
          tempTask = { ...activeTask, status: overId as TaskStatus };
        else tempTask = { ...activeTask, priority: overId as TaskPriority };
        dispatch(
          setTasks(tasks.map((t) => (t._id === activeId ? tempTask : t)))
        );
      }
    }
  }
}
