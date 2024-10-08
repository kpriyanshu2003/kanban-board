"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

function Overlay() {
  const task = useSelector((state: RootState) => state.task.current);
  return (
    <>
      {task && (
        <div className="absolute z-40 h-screen w-screen overflow-hidden bg-black/80 pointer-events-auto cursor-default"></div>
      )}
    </>
  );
}

export default Overlay;
