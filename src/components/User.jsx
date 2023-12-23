import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import UserAvatar from "./UserAvatar";
import { useDisplay } from "../functions/zustand";

import { GoPlus } from "react-icons/go";
import { PiDotsThree } from "react-icons/pi";

function User({ data }) {
  const [userData, setUserData] = useState({
    data: null,
    users: [],
  });

  const ordering = useDisplay((state) => state.ordering);

  useEffect(() => {
    if (data) {
      setUserData({ data, users: data.users });
    }
  }, [data]);

  const sortTickets = (userTickets) => {
    return [...userTickets].sort((a, b) => {
      if (ordering === "Priority") {
        return a.priority - b.priority;
      } else if (ordering === "Title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  return (
    <div className="flex">
      {userData.users.length > 0 ? (
        userData.users.map((user) => (
          <div key={user.id} className="flex w-72 mx-3">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <UserAvatar user={user} />
                  <span>{user.name}</span>
                  <span>{getTicketCount(user.id)}</span>
                </div>
                <div className="flex gap-2 items-center text-gray-700">
                  <GoPlus />
                  <PiDotsThree />
                </div>
              </div>

              <div>
                {sortTickets(
                  userData.data.tickets.filter(
                    (ticket) => ticket.userId === user.id
                  )
                ).map((ticket) => (
                  <Ticket
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag[0]}
                    priority={ticket.priority}
                    userId={ticket.userId}
                    status={ticket.status}
                    users={userData.users}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );

  function getTicketCount(userId) {
    return userData.data.tickets.filter((ticket) => ticket.userId === userId)
      .length;
  }
}

export default User;
