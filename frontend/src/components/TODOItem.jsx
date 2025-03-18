import React from "react";

const TodoItem = ({ task, description, status }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-96 flex flex-col justify-between">
      {/* Task Title */}
      <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
        {task}
      </span>

      {/* Task Description */}
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      
      {/* Status Badge */}
      <span className={`mt-2 px-2 py-1 text-sm rounded self-end ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
        {status}
      </span>
    </div>
  );
};

export default TodoItem;
