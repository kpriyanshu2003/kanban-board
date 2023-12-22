import React, { useEffect, useState } from "react";
import { TbCircleDotted } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { PiDotsThree } from "react-icons/pi";
import Ticket from "./Ticket";

function Status(props) {
  const [data, setData] = useState({
    data: null,
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
    cancelled: [],
  });

  useEffect(() => {
    if (props.data) {
      setData({
        data: props.data,
        backlog: props.data.tickets.filter(
          (ticket) => ticket.status === "Backlog"
        ),
        todo: props.data.tickets.filter((ticket) => ticket.status === "Todo"),
        inProgress: props.data.tickets.filter(
          (ticket) => ticket.status === "In progress"
        ),
        done: props.data.tickets.filter((ticket) => ticket.status === "Done"),
        cancelled: props.data.tickets.filter(
          (ticket) => ticket.status === "Cancelled"
        ),
      });
    }
  }, [props.data]);

  return (
    <div className="flex">
      <div className="w-76">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TbCircleDotted />
            <span>Backlog</span>
            <span>{data.backlog.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
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
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" w-72">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TbCircleDotted />
            <span>ToDo</span>
            <span>{data.todo.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
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
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" w-72">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TbCircleDotted />
            <span>In Progress</span>
            <span>{data.inProgress.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
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
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" w-72">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TbCircleDotted />
            <span>Done</span>
            <span>{data.done.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
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
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-76">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <TbCircleDotted />
            <span>Cancelled</span>
            <span>{data.cancelled.length}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Status;
