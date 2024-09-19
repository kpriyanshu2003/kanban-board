import React from "react";
import NavBar from "@/components/NavBar";
import TaskList from "@/page/TaskList";
import Kanban from "@/page/Kanban";

function Page({ params }: { params: { id: string } }) {
  const pageComponents: { [key: string]: JSX.Element | string } = {
    task: <TaskList />,
    kanban: <Kanban />,
  };

  const renderPage = () =>
    pageComponents[params.id] || <div>Page not found</div>;
  const showNavBar = !!pageComponents[params.id];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {showNavBar && <NavBar />}
      <div className={showNavBar ? "w-full ml-72 pt-10 " : "w-full"}>
        {renderPage()}
      </div>
    </div>
  );
}

export default Page;
