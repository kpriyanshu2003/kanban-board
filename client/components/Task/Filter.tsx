"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setFilter } from "@/redux/features/task/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.task.filter);

  return (
    <div className="my-5 flex gap-5">
      <Select
        onValueChange={(e) => dispatch(setFilter({ ...filter, status: e }))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Task Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => dispatch(setFilter({ ...filter, priority: e }))}
      >
        <SelectTrigger className="w-[180px]">
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
  );
}

export default Filter;
