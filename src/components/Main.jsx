import React, { useEffect, useState } from "react";
import { useDisplay } from "../functions/zustand";
import { fetchData, refreshDataEvery10Minutes } from "../functions/api";

import User from "./User";
import Status from "./Status";
import Priority from "./Priority";

function Main() {
  const grouping = useDisplay((state) => state.grouping);
  const [data, setData] = useState();

  useEffect(() => {
    fetchData()
      .then((initialData) => {
        setData(initialData);
        refreshDataEvery10Minutes(setData);
      })
      .catch((error) => {
        console.error("Error setting or refreshing data:", error);
      });
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
