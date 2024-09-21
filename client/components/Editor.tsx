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

function Editor() {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: TaskStatus.ToDo,
    priority: TaskPriority.Low,
    dueDate: new Date(),
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    console.log("Hi");
  }, []);

  return (
    <>
      {
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg w-[80%] h-[90%] p-6 bg-white">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Create / Edit Task</h1>
            <IoCloseCircleOutline className="w-6 h-6" />
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
              <Input
                type="text"
                id="description"
                placeholder="Description"
                value={formData.description as string}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-5 my-4">
              <div className="grid gap-1.5 text-left my-4 w-full">
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(e) => setFormData({ ...formData, status: e })}
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
                  onValueChange={(e) =>
                    setFormData({ ...formData, priority: e })
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
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Editor;
