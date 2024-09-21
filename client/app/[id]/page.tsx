import React from "react";
import NavBar from "@/components/NavBar";
import TaskList from "@/page/TaskList";
import Kanban from "@/page/Kanban";
import Editor from "@/components/Editor";

function Page({ params }: { params: { id: string } }) {
  const pageComponents: { [key: string]: JSX.Element | string } = {
    task: <TaskList />,
    kanban: <Kanban />,
  };

  const renderPage = () =>
    pageComponents[params.id] || <div>Page not found</div>;
  const showNavBar = !!pageComponents[params.id];

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      {showNavBar && <NavBar />}
      <div className="mx-4 py-8">{renderPage()}</div>
      {/* <Editor /> */}
    </div>
  );
}

export default Page;
