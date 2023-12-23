import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import { useDisplay } from "../functions/zustand";
import { AiOutlineDash } from "react-icons/ai";
import { LuSignalLow } from "react-icons/lu";
import { LuSignalMedium } from "react-icons/lu";
import { LuSignalHigh } from "react-icons/lu";
import { BsExclamationSquareFill } from "react-icons/bs";

function Priority(props) {
  const [data, setData] = useState({
    data: null,
    noPriority: [],
    low: [],
    medium: [],
    high: [],
    urgent: [],
  });

  const ordering = useDisplay((state) => state.ordering);

  useEffect(() => {
    if (props.data) {
      const sortedData = {
        data: props.data,
        noPriority: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.priority === 0),
          "NoPriority"
        ),
        low: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.priority === 1),
          "Low"
        ),
        medium: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.priority === 2),
          "Medium"
        ),
        high: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.priority === 3),
          "High"
        ),
        urgent: sortTicketsByOrdering(
          props.data.tickets.filter((ticket) => ticket.priority === 4),
          "Urgent"
        ),
      };
      setData(sortedData);
    }
  }, [props.data, ordering]);

  const sortTicketsByOrdering = (tickets, priorityLevel) => {
    if (priorityLevel === "NoPriority") {
      return tickets;
    } else {
      return tickets.sort((a, b) => {
        if (ordering === "Priority") return a.priority - b.priority;
        else if (ordering === "Title") return a.title.localeCompare(b.title);
        else return 0;
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-72 mx-2">
        <div className="flex items-center gap-2">
          <AiOutlineDash className="text-gray-400" />
          <span className="font-medium">No Priority</span>
          <span>{data.noPriority.length}</span>
        </div>
        {data.noPriority.map((ticket, index) => (
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

      <div className="w-72 mx-2">
        <div className="flex items-center gap-2">
          <LuSignalLow className="text-gray-400" />
          <span className="font-medium">Low</span>
          <span>{data.low.length}</span>
        </div>
        {data.low.map((ticket, index) => (
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

      <div className="w-72 mx-2">
        <div className="flex items-center gap-2">
          <LuSignalMedium className="text-gray-400" />
          <span className="font-medium">Medium</span>
          <span>{data.medium.length}</span>
        </div>
        {data.medium.map((ticket, index) => (
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

      <div className="w-72 mx-2">
        <div className="flex items-center gap-2">
          <LuSignalHigh className="text-gray-400" />
          <span className="font-medium">High</span>
          <span>{data.high.length}</span>
        </div>
        {data.high.map((ticket, index) => (
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

      <div className="w-72 mx-2">
        <div className="flex items-center gap-2">
          <BsExclamationSquareFill className="text-orange-500" />
          <span className="font-medium">Urgent</span>
          <span>{data.urgent.length}</span>
        </div>
        {data.urgent.map((ticket, index) => (
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
  );
}

export default Priority;
