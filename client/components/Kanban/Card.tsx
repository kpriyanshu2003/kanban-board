import { Badge } from "../ui/badge";
import { CSS } from "@dnd-kit/utilities";
import { LuGrip } from "react-icons/lu";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { TaskCardProps, TaskDragData } from "@/@types/kanban";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "@/redux/features/task/taskSlice";
import { RootState } from "@/redux/store";

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: { type: "Task", task } satisfies TaskDragData,
    attributes: { roleDescription: "Task" },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.task.kanbanView);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      onClick={() => dispatch(setCurrent(task))}
    >
      <CardHeader className="px-2 py-2 space-between flex flex-row border-b-2 border-secondary relative items-center cursor-pointer">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-2 text-secondary-foreground/50 h-auto cursor-grab"
        >
          <LuGrip className="w-4 h-4" />
        </Button>
        <Badge variant={"outline"} className="ml-auto font-semibold">
          {view === "Status" ? task.status : task.priority}
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.title.length > 32 ? task.title.slice(0, 32) + "..." : task.title}
      </CardContent>
    </Card>
  );
}
