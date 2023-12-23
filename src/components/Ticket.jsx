import React from "react";
import UserAvatar from "./UserAvatar";
import { useDisplay, useTheme } from "../functions/zustand";

import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { TbCircle, TbCircleDotted } from "react-icons/tb";
import { GoXCircleFill, GoCheckCircleFill } from "react-icons/go";
import { LuSignalMedium, LuSignalLow, LuSignalHigh } from "react-icons/lu";
import { BsExclamationSquareFill } from "react-icons/bs";
import { AiOutlineDash } from "react-icons/ai";
import { PiDotsThree } from "react-icons/pi";

function Ticket(props) {
  const user = props.users.find((user) => user.id === props.userId);
  const grouping = useDisplay((state) => state.grouping);
  const theme = useTheme((state) => state.theme);
  const getStatusIcon = () => {
    switch (props.status) {
      case "Backlog":
        return <TbCircleDotted />;
      case "Todo":
        return <TbCircle />;
      case "In progress":
        return (
          <span className="text-yellow-400">
            <BiSolidCircleThreeQuarter />
          </span>
        );
      case "Done":
        return <GoCheckCircleFill />;
      case "Cancelled":
        return <GoXCircleFill />;
      default:
        return <PiDotsThree />;
    }
  };
  const getPriorityIcon = () => {
    switch (props.priority) {
      case 0:
        return <AiOutlineDash />;
      case 1:
        return <LuSignalLow />;
      case 2:
        return <LuSignalMedium />;
      case 3:
        return <LuSignalHigh />;
      case 4:
        return (
          <span className="text-orange-500">
            <BsExclamationSquareFill />
          </span>
        );
      default:
        return null;
    }
  };
  return (
    <div
      className={`p-4 border-[0.5px] my-4 ${
        theme ? "bg-[#161b22] border-slate-500" : "bg-white"
      } rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <span className="uppercase text-[#8d8d8d]">{props.id}</span>
        {grouping !== "User" && (
          <span>
            <UserAvatar user={user} />
          </span>
        )}
      </div>
      <div className="font-medium leading-5 my-3 flex gap-1">
        {grouping !== "Status" && (
          <span className={theme ? "text-white" : "text-gray-400"}>
            {getStatusIcon()}
          </span>
        )}
        <span className={theme ? "text-white" : "text-black"}>
          {props.title}
        </span>
      </div>
      <div className="flex gap-2">
        {grouping !== "Priority" && (
          <span
            className={`border-[0.5px] rounded-md border-slate-500 p-1 w-6 h-6 flex items-center justify-center ${
              theme ? "text-white" : "text-slate-400"
            }`}
          >
            {getPriorityIcon()}
          </span>
        )}
        <span className="border-[0.1px] p-1 h-6 flex gap-2 items-center rounded-md border-slate-500">
          <div className="rounded-full bg-gray-400 w-3 h-3"></div>
          <span className="text-gray-500 text-sm">{props.tag}</span>
        </span>
      </div>
    </div>
  );
}

export default Ticket;
