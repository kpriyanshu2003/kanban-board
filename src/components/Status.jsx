import React, { useEffect, useState } from "react";
import { useDisplay, useTheme } from "../functions/zustand";
import Ticket from "./Ticket";

import { PiDotsThree } from "react-icons/pi";
import { TbCircleDotted, TbCircle } from "react-icons/tb";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { GoCheckCircleFill, GoXCircleFill, GoPlus } from "react-icons/go";

function Status(props) {
  const [data, setData] = useState({
    data: null,
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
    cancelled: [],
  });

  const ordering = useDisplay((state) => state.ordering);
  const theme = useTheme((state) => state.theme);
  useEffect(() => {
    if (props.data) {
      const sortedData = {
        data: props.data,
        backlog: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.status === "Backlog"),
          ordering
        ),
        todo: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.status === "Todo"),
          ordering
        ),
        inProgress: sortTicketsByOrdering(
          props.data.tickets.filter(
            (ticket) => ticket.status === "In progress"
          ),
          ordering
        ),
        done: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.status === "Done"),
          ordering
        ),
        cancelled: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.status === "Cancelled"),
          ordering
        ),
      };
      setData(sortedData);
    }
  }, [props.data, ordering]);

  const sortTicketsByOrdering = (tickets, ordering) => {
    if (ordering === "Priority")
      return tickets.sort((a, b) => a.priority - b.priority);
    else if (ordering === "Title")
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    else return tickets;
  };

  return (
    <div className={`flex `}>
      <div className="w-72 mx-2">
        <div className="flex justify-between items-center">
          <div
            className={`flex gap-2 items-center ${
              theme ? "text-white" : "text-black"
            }`}
          >
            <TbCircleDotted />
            <span className="font-medium">Backlog</span>
            <span>{data.backlog.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-200">
            <GoPlus />
            <PiDotsThree />
          </div>
        </div>
        <div>
          {data.backlog.map((ticket, index) => (
            <div key={index}>
              <Ticket
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag[0]}
                priority={ticket.priority}
                userId={ticket.userId}
                users={props.data.users}
                status={ticket.status}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-72 mx-2">
        <div className="flex justify-between items-center">
          <div
            className={`flex gap-2 items-center ${
              theme ? "text-white" : "text-black"
            }`}
          >
            <TbCircle />
            <span className="font-medium">ToDo</span>
            <span>{data.todo.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-200">
            <GoPlus />
            <PiDotsThree />
          </div>
        </div>
        <div>
          {data.todo.map((ticket, index) => (
            <div key={index}>
              <Ticket
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag[0]}
                priority={ticket.priority}
                userId={ticket.userId}
                status={ticket.status}
                users={props.data.users}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-72 mx-2">
        <div className="flex justify-between items-center">
          <div
            className={`flex gap-2 items-center ${
              theme ? "text-white" : "text-black"
            }`}
          >
            <span className="text-yellow-300">
              <BiSolidCircleThreeQuarter />
            </span>
            <span className="font-medium">In Progress</span>
            <span>{data.inProgress.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-200">
            <GoPlus />
            <PiDotsThree />
          </div>
        </div>
        <div>
          {data.inProgress.map((ticket, index) => (
            <div key={index}>
              <Ticket
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag[0]}
                priority={ticket.priority}
                userId={ticket.userId}
                users={props.data.users}
                status={ticket.status}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-72 mx-2">
        <div className="flex justify-between items-center">
          <div
            className={`flex gap-2 items-center ${
              theme ? "text-white" : "text-black"
            }`}
          >
            <span className="text-blue-800">
              <GoCheckCircleFill />
            </span>
            <span className="font-medium">Done</span>
            <span>{data.done.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-200">
            <GoPlus />
            <PiDotsThree />
          </div>
        </div>
        <div>
          {data.done.map((ticket, index) => (
            <div key={index}>
              <Ticket
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag[0]}
                priority={ticket.priority}
                userId={ticket.userId}
                status={ticket.status}
                users={props.data.users}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-72 mx-2">
        <div className="flex justify-between items-center">
          <div
            className={`flex gap-2 items-center ${
              theme ? "text-white" : "text-black"
            }`}
          >
            <span className="text-gray-400">
              <GoXCircleFill />
            </span>
            <span className="font-medium">Cancelled</span>
            <span>{data.cancelled.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-200">
            <GoPlus />
            <PiDotsThree />
          </div>
        </div>
        <div>
          {data.cancelled.map((ticket, index) => (
            <div key={index}>
              <Ticket
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag[0]}
                priority={ticket.priority}
                userId={ticket.userId}
                users={props.data.users}
                status={ticket.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Status;
