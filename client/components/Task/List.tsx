/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/actions/task";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/features/task/taskSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

function List() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const filter = useSelector((state: RootState) => state.task.filter);
  const sort = useSelector((state: RootState) => state.task.sort);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        dispatch(setTasks(data.data));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg whitespace-nowrap w-2/6">
            Title
          </TableHead>
          <TableHead className="text-lg whitespace-nowrap w-3/6">
            Description
          </TableHead>
          <TableHead className="text-lg whitespace-nowrap w-1/6">
            Status
          </TableHead>
          <TableHead className="text-lg whitespace-nowrap w-1/6">
            Priority
          </TableHead>
          <TableHead className="text-lg whitespace-nowrap w-1/6">
            Due Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks
          .filter((task) => {
            if (filter.status !== "All") return task.status === filter.status;
            return true;
          })
          .filter((task) => {
            if (filter.priority !== "All")
              return task.priority === filter.priority;
            return true;
          })
          .sort((a, b) => {
            if (sort.key === "Any") return 0;
            if (sort.key === "Status") return a.status.localeCompare(b.status);
            if (sort.key === "Priority")
              return a.priority.localeCompare(b.priority);
            if (sort.key === "Due Date") {
              if (a.dueDate && b.dueDate)
                return a.dueDate.getTime() - b.dueDate.getTime();
              return 0;
            }
            return 0;
          })
          .sort(() => {
            if (sort.order === "asc") return -1;
            if (sort.order === "desc") return 1;
            return 0;
          })
          .map((task) => (
            <TableRow
              key={task._id}
              className="my-5"
              onClick={() => toast("title" + task._id)}
            >
              <TableCell className="font-medium cursor-pointer">
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell className="text-right">
                {task.dueDate?.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default List;
