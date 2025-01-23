import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  // Load task details
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const selectedTask = tasks.find((task: any) => task.id === Number(id));
    setTask(selectedTask);
  }, [id]);

  const handleEditTask = (updatedTask: { title: string; color: string }) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.map((task: any) =>
      task.id === Number(id) ? { ...task, ...updatedTask } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm initialData={task} onSubmit={handleEditTask} />
    </div>
  );
}
