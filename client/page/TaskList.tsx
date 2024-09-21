import React from "react";
import List from "@/components/Task/List";
import Filter from "@/components/Task/Filter";
import Sort from "@/components/Task/Sort";

async function TaskList() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Task List</h1>
      <Filter />
      <Sort />
      <List />
    </div>
  );
}

export default TaskList;
