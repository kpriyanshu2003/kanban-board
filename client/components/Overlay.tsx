"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

function Overlay() {
  const task = useSelector((state: RootState) => state.task.current);
  return (
    <>
      {task && (
        <div className="absolute z-20 h-screen w-screen overflow-hidden bg-[#00000050] pointer-events-auto cursor-default"></div>
      )}
    </>
  );
}

export default Overlay;
