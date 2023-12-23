import React, { useState } from "react";
import { useTheme, useDisplay } from "../functions/zustand";

import { GiSettingsKnobs } from "react-icons/gi";
import { GoChevronDown } from "react-icons/go";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function NavBar() {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
  const setGrouping = useDisplay((state) => state.setGrouping);
  const setOrdering = useDisplay((state) => state.setOrdering);
  const [settings, setSettings] = useState(false);
  return (
    <div className="flex justify-between px-6 items-center h-16 bg-white">
      <div className="relative">
        <div
          className="flex items-center gap-2 py-2 px-3 rounded-md shadow-lg cursor-pointer "
          onClick={() => setSettings(!settings)}
        >
          <span className="rotate-90">
            <GiSettingsKnobs />
          </span>
          <span>Display</span>
          <span
            className={`${
              settings ? "rotate-180" : "rotate-0"
            } transition duration-500 cursor-pointer`}
          >
            <GoChevronDown />
          </span>
        </div>
        {settings && (
          <div className="absolute bg-white rounded-md border top-12 p-4 left-0 w-72 z-10 leading-10">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 mb-3">Grouping</span>
              <select
                onChange={(e) => setGrouping(e.target.value)}
                className="outline-none border p-1 rounded-sm text-sm w-32"
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 mb-3">Ordering</span>
              <select
                onChange={(e) => setOrdering(e.target.value)}
                className="outline-none border p-1 rounded-sm text-sm w-32"
              >
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div onClick={() => setTheme(!theme)} className="cursor-pointer">
        {theme ? (
          <MdLightMode className="h-6 w-6" />
        ) : (
          <MdDarkMode className="h-6 w-6" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
