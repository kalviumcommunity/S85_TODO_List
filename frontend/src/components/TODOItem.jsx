import React from "react";

const TodoItem = ({ task, status }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-80 flex justify-between items-center">
      <span className={`text-lg ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
        {task}
      </span>
    
      <span className={`px-2 py-1 text-sm rounded ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
        {status}
      </span>
    </div>
  );
};

export default TodoItem;
