"use client";

import React from "react";
import { KanbanBoard } from "@/components/Kanban/Board";
import Collection from "@/components/Kanban/Collection";

function Kanban() {
  return (
    <>
      <h1 className="text-2xl font-bold">Kanban Board</h1>
      <Collection />
      <KanbanBoard />
    </>
  );
}

export default Kanban;
