import Link from "next/link";
import React, { useState, useEffect } from "react";

export interface Task {
  id: number;
  title: string;
  status: string; 
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  const saveTasksToStorage = (updatedTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: "Pending",
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setNewTaskTitle(""); 
  };

  const handleToggleStatus = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "Done" ? "Pending" : "Done" } : task
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">

      <h1 className="text-3xl font-bold text-center mb-6">Todo List !!</h1>

      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Enter your list item here..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-l w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-black text-white rounded-r hover:bg-gray-800 transition-colors"
        >
          Add
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border border-gray-300">#ID</th>
            <th className="p-3 border border-gray-300">Work</th>
            <th className="p-3 border border-gray-300">Status</th>
            <th className="p-3 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task.id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200`}
            >
              <td className="p-3 border border-gray-300">{index + 1}</td>
              <td className="p-3 border border-gray-300 capitalize">{task.title}</td>
              <td className="p-3 border border-gray-300">{task.status}</td>
              <td className="p-3 border border-gray-300">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleStatus(task.id)}
                    className={`px-4 py-1 rounded ${
                      task.status === "Done"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    } hover:opacity-90 transition-opacity`}
                  >
                    TOGGLE
                  </button>
                  <button
                    onClick={() =>
                      confirm("Are you sure you want to delete this task?") &&
                      handleDelete(task.id)
                    }
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/edit-task/${task.id}`}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
