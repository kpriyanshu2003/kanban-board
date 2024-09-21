import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setKanbanView } from "@/redux/features/task/taskSlice";
import { RootState } from "@/redux/store";

export default function Collection() {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.task.kanbanView);

  return (
    <Select
      defaultValue={view}
      onValueChange={(e) => dispatch(setKanbanView(e))}
    >
      <SelectTrigger className="w-[180px] bg-white my-5">
        <SelectValue placeholder="Select a View" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Status">Status</SelectItem>
          <SelectItem value="Priority">Priority</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
