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

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.task.sort);

  return (
    <div className="my-5 flex gap-5">
      <Select
        onValueChange={(e) => dispatch(setFilter({ ...sort, key: e }))}
        defaultValue={sort.key}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Task Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Any">Any</SelectItem>
            <SelectItem value="Status">Status</SelectItem>
            <SelectItem value="Priority">Priority</SelectItem>
            <SelectItem value="Due Date">Due Date</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => dispatch(setFilter({ ...sort, order: e }))}
        defaultValue={sort.order}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sort;
