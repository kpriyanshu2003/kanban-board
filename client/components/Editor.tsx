"use client";

import { Task, TaskPriority, TaskStatus } from "@/@types/task";
import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrent } from "@/redux/features/task/taskSlice";
import { createTask, deleteTask, updateTask } from "@/actions/task";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

function Editor() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: TaskStatus.ToDo,
    priority: TaskPriority.Low,
    dueDate: null,
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const task = useSelector((state: RootState) => state.task.current);
  useEffect(() => {
    task && task !== "create" && setFormData(task as Task);
  }, [task]);

  const handleSubmit = () => {
    if (task === "create") {
      createTask(formData)
        .then(() => {
          toast.success("Task created successfully");
          dispatch(setCurrent(null));
        })
        .catch((err) => {
          toast.error(err.message);
          console.error(err);
        });
    } else {
      updateTask(formData)
        .then(() => [
          toast.success("Task updated successfully"),
          dispatch(setCurrent(null)),
        ])
        .catch((err) => {
          toast.error(err.message);
          console.error(err);
        });
    }
  };

  const handleDelete = () => {
    if (task !== "create" && task)
      deleteTask(task._id)
        .then(() => {
          toast.success("Task deleted successfully");
          dispatch(setCurrent(null));
        })
        .catch((err) => {
          toast.error(err.message);
          console.error(err);
        });
  };

  return (
    <>
      {task && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg w-[600px] p-6 bg-white">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">
              {task === "create" ? "Create" : "Update"} Task
            </h1>
            <IoCloseCircleOutline
              className="w-6 h-6 cursor-pointer"
              onClick={() => dispatch(setCurrent(null))}
            />
          </div>

          <div className="mt-8">
            <div className="grid gap-1.5 text-left my-4">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                placeholder="Title"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-1.5 text-left my-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Type your message here."
                className="resize-none"
                value={formData.description as string}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                maxLength={200}
                rows={5}
              />
            </div>
            <div className="flex items-center gap-5 my-4">
              <div className="grid gap-1.5 text-left my-4 w-full">
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={formData.status}
                  onValueChange={(e) =>
                    setFormData({ ...formData, status: e as TaskStatus })
                  }
                >
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue placeholder="Task Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5 text-left my-4 w-full">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  defaultValue={formData.priority}
                  onValueChange={(e) =>
                    setFormData({ ...formData, priority: e as TaskPriority })
                  }
                >
                  <SelectTrigger className="w-full" id="priority">
                    <SelectValue placeholder="Task Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5 text-left my-4">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild id="dueDate">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal bg-transparent",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? (
                      format(formData.dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate as Date}
                    onSelect={(date) =>
                      setFormData({ ...formData, dueDate: date || null })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-2 items-center w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-red-300 h-10 w-10"
                >
                  <MdDelete className="w-5 h-5 absolute" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button onClick={() => handleSubmit()} className="h-10">
              {task === "create" ? "Create Task" : "Update Task"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Editor;
