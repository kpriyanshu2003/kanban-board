"use server";

import api, { fetchWithInterceptor } from ".";
import { Task } from "@/@types/task";
import { cookies } from "next/headers";

const createTask = async (task: Task) => {
  try {
    const token = cookies().get("token")?.value;

    const response = await fetch(api + "/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

const getTasks = async () => {
  try {
    const response = await fetchWithInterceptor(
      api + "/tasks",
      { method: "GET" },
      cookies().get("token")?.value
    );
    if (!response.ok) throw new Error("Failed to fetch tasks");

    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

const getTaskById = async (id: string) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch task");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

const updateTask = async (task: Task) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/task/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

const deleteTask = async (id: string) => {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(api + `/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
