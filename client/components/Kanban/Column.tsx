import { ReactNode, useMemo } from "react";
import { Button } from "../ui/button";
import { CSS } from "@dnd-kit/utilities";
import { LuGrip } from "react-icons/lu";
import { cva } from "class-variance-authority";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Card, CardContent, CardHeader } from "../ui/card";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";
import { Task } from "@/@types/task";
import { BoardColumnProps } from "@/@types/kanban";
import { TaskCard } from "./Card";

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => tasks.map((task: Task) => task._id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column,
    data: { type: "Column", column },
    attributes: { roleDescription: `Column: ${column}` },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "min-h-[20vh] max-h-[80vh] w-[350px] md:h-[80vh] max-w-full bg-primary-foreground md:flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
        >
          <LuGrip className="w-6 h-6" />
        </Button>
        <span className="ml-auto font-bold">{column}</span>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-4">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex md:gap-3 items-center flex-col md:flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
