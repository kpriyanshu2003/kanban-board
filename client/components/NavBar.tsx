"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NavItems, NavSettings } from "@/constants/NavBar";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import classNames from "classnames";

function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={classNames(
        "h-screen fixed border-r transition-all duration-500 bg-white",
        collapsed ? "w-16 " : "w-64"
      )}
    >
      <Link
        href="/kanban"
        className="block p-3 cursor-pointer py-5 font-semibold text-2xl text-center"
      >
        {collapsed ? <span>Kb</span> : <span>Logo. Kanban</span>}
      </Link>
      <div className="mt-5">
        {NavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium gap-2 flex items-center"
          >
            {item.logo}
            {!collapsed && <span className="pl-4">{item.name}</span>}
          </Link>
        ))}
      </div>
      <div
        className={classNames(
          "absolute bottom-5 w-full items-center justify-center flex",
          collapsed ? "flex-col" : "flex-row"
        )}
      >
        {NavSettings.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              "hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium gap-2 flex items-center w-full"
            )}
          >
            {item.logo}
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}

        <div
          onClick={() => setCollapsed(!collapsed)}
          className={classNames(
            "cursor-pointer p-4 ",
            collapsed && "hover:bg-slate-100 w-full"
          )}
        >
          {collapsed ? (
            <TbLayoutSidebarRightCollapseFilled className="w-5 h-5" />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
