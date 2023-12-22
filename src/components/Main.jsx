import React, { useEffect, useState } from "react";
import Status from "./Status";
import { useDisplay } from "../functions/zustand";
import User from "./User";
import Priority from "./Priority";

function Main() {
  const grouping = useDisplay((state) => state.grouping);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(
      "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="pt-4 px-4">
      {grouping === "Status" ? <Status data={data} /> : null}
      {grouping === "Priority" ? <Priority data={data} /> : null}
      {grouping === "User" ? <User data={data} /> : null}
    </div>
  );
}

export default Main;
