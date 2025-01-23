import React, { useState } from "react";

interface TaskFormProps {
  initialData?: { title: string; color: string };
  onSubmit: (data: { title: string; color: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [color, setColor] = useState(initialData?.color || "black");

  const textColorClasses: { [key: string]: string } = {
    black: "text-black",
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    gray: "text-gray-500",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Font Color</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="gray">Gray</option>
        </select>
      </div>
      <div className="mt-4">
        <p className={`text-lg font-semibold ${textColorClasses[color]}`}>
          {title || "Preview Title"}
        </p>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default TaskForm;
