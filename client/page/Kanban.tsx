"use client";

import React from "react";
import { KanbanBoard } from "@/components/Kanban/Board";
import Collection from "@/components/Kanban/Collection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { IoMenu } from "react-icons/io5";

function Kanban() {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.sidebar.collapsed);
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold flex items-center justify-between">
        <span>Kanban Board</span>
        {view && (
          <IoMenu
            className="w-6 h-6"
            onClick={() => dispatch(toggleSidebar())}
          />
        )}
      </h1>
      <Collection />
      <KanbanBoard />
    </div>
  );
}

export default Kanban;
