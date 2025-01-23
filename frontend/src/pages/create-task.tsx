import React from "react";
import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/router";

const CreateTask: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (data: { title: string; color: string }) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      color: data.color,
      completed: false,
    };
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;
