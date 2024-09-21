"use client";

import React from "react";
import Link from "next/link";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
  TbLogout,
} from "react-icons/tb";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NavItems } from "@/constants/NavBar";
import { toggleSidebar } from "../redux/features/sidebar/sidebarSlice";
import { MdCreate } from "react-icons/md";
import { Button } from "./ui/button";
import { setCurrent } from "@/redux/features/task/taskSlice";

function NavBar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);

  return (
    <div
      className={cn("transition-all duration-500", collapsed ? "w-24" : "w-72")}
    >
      <div
        className={cn(
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
        <div className="mt-5 grid place-items-center">
          {NavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium gap-2 flex items-center w-full"
            >
              {item.logo}
              {!collapsed && <span className="pl-4">{item.name}</span>}
            </Link>
          ))}
          <div className="px-3 w-full my-2">
            <Button
              className="hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium gap-2 flex items-center w-full"
              variant="secondary"
              onClick={() => dispatch(setCurrent("create"))}
            >
              <MdCreate />
              Create Task
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "absolute bottom-5 w-full items-center justify-center flex",
            collapsed ? "flex-col" : "flex-row"
          )}
        >
          <Link
            href="/auth/logout"
            className={cn(
              "hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium w-full flex items-center",
              collapsed && "justify-center"
            )}
          >
            <TbLogout className="h-6 w-6" />
            {!collapsed && <span className="pl-4">Logout</span>}
          </Link>
          <div
            onClick={() => dispatch(toggleSidebar())}
            className={cn(
              "cursor-pointer p-4 hover:bg-slate-100 duration-500 grid place-items-center",
              collapsed && " w-full"
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
    </div>
  );
}

export default NavBar;
