import React from "react";
import Link from "next/link";

export interface Task {
  id: number;
  title: string;
  color: string; // Font color for the title
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const textColorClasses: { [key: string]: string } = {
    black: "text-black",
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    gray: "text-gray-500",
  };

  return (
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
            className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
          >
            {/* Task ID */}
            <td className="p-3 border border-gray-300">{index + 1}</td>

            {/* Task Title */}
            <td className={`p-3 border border-gray-300 ${textColorClasses[task.color] || ""}`}>
              {task.title}
            </td>

            {/* Task Status */}
            <td className="p-3 border border-gray-300">
              {task.completed ? "Done" : "Pending"}
            </td>

            {/* Actions */}
            <td className="p-3 border border-gray-300">
              <div className="flex space-x-2">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`px-4 py-1 rounded ${
                    task.completed ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                  } hover:opacity-90`}
                >
                  TOGGLE
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
  );
};

export default TaskList;
