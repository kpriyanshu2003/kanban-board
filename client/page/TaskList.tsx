"use client";

import React from "react";
import List from "@/components/Task/List";
import Filter from "@/components/Task/Filter";
import Sort from "@/components/Task/Sort";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { IoMenu } from "react-icons/io5";

function TaskList() {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.sidebar.collapsed);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold flex items-center justify-between">
        <span>Task List</span>
        {view && (
          <IoMenu
            className="w-6 h-6"
            onClick={() => dispatch(toggleSidebar())}
          />
        )}
      </h1>
      <Filter />
      <Sort />
      <List />
    </div>
  );
}

export default TaskList;
