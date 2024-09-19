import { TbLogout } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { TbLayoutKanbanFilled } from "react-icons/tb";

export const NavItems = [
  {
    logo: <FaTasks size={20} />,
    name: "Task List",
    href: "/task",
  },
  {
    logo: <TbLayoutKanbanFilled size={22} />,
    name: "Kanban",
    href: "/kanban",
  },
];

export const NavSettings = [
  {
    logo: <TbLogout className="h-6 w-6" />,
    name: "Logout",
    href: "/auth/logout",
  },
];
