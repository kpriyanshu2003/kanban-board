// Ticket.jsx
import React from "react";
import UserAvatar from "./UserAvatar";
import { TbCircle } from "react-icons/tb";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { TbCircleDotted } from "react-icons/tb";
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";

import { PiDotsThree } from "react-icons/pi";

function Ticket(props) {
  const user = props.users.find((user) => user.id === props.userId);
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
        return <PiDotsThree />; // You can customize this to handle other cases
    }
  };
  return (
    <div className="p-4 border my-4 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <span className="uppercase text-[#8d8d8d]">{props.id}</span>
        <span>
          <UserAvatar user={user} />
        </span>
      </div>
      <div className="font-medium leading-5 my-3 flex gap-1">
        <span>{getStatusIcon()}</span>
        <span>{props.title}</span>
      </div>
      <div className="flex gap-2">
        <span className="border p-1 w-6 h-6 flex items-center justify-center">
          {props.priority}
        </span>
        <span className="border p-1 h-6 flex gap-2 items-center">
          <div className="rounded-full bg-gray-400 w-3 h-3"></div>
          <span className="text-gray-500 text-sm">{props.tag}</span>
        </span>
      </div>
    </div>
  );
}

export default Ticket;
