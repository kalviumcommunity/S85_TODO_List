import React, { useState } from "react";

const TodoItem = ({ id, task, description, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [newDescription, setNewDescription] = useState(description);

  // Handle edit toggle
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle update API call
  const handleUpdate = async () => {
    const updatedTodo = { title: newTask, description: newDescription };
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      toggleEdit();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-80 flex flex-col justify-between relative">
      {/* Delete Button */}
      <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
        🗑️
      </button>

      {isEditing ? (
        <>
          <input 
            type="text" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            className="border p-1 w-full text-lg font-semibold"
          />
          <textarea 
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
            className="border p-1 w-full text-sm mt-1"
          />
          <button onClick={handleUpdate} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
            Save
          </button>
        </>
      ) : (
        <>
          <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
            {task}
          </span>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </>
      )}

      {/* Status Badge */}
      <div className="flex justify-between items-center mt-2">
        <span className={`px-2 py-1 text-sm rounded ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
          {status}
        </span>
        <button onClick={toggleEdit} className="text-blue-500 hover:text-blue-700">
          ✏️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;




// import React from "react";
// import { Trash2 } from "lucide-react"; // Using Lucide Icons

// const TodoItem = ({ todo, setTodos, todos }) => {
//     const { _id, title, description, dueDate, status } = todo;

//     const handleDelete = async () => {
//         await fetch(`http://localhost:5000/api/todos/${_id}`, { method: "DELETE" });

//         setTodos(todos.filter(t => t._id !== _id));
//     };

//     return (
//         <div className="border p-4 rounded-lg shadow-md bg-white w-80 flex flex-col justify-between relative">
//             {/* Delete Icon */}
//             <button onClick={handleDelete} className="absolute top-2 right-2 text-red-500">
//                 <Trash2 size={18} />
//             </button>

//             {/* Task Title */}
//             <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
//                 {title}
//             </span>

//             {/* Task Description */}
//             <p className="text-sm text-gray-600 mt-1">{description}</p>

//             {/* Due Date */}
//             <p className="text-xs text-blue-600 mt-1">Due: {dueDate}</p>
            
//             {/* Status Badge */}
//             <span className={`mt-2 px-2 py-1 text-sm rounded self-end ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
//                 {status}
//             </span>
//         </div>
//     );
// };

// export default TodoItem;





// import React from "react";

// const TodoItem = ({ task, description, status, onDelete }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-md bg-white w-96 flex flex-col justify-between">
//       {/* Task Title */}
//       <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
//         {task}
//       </span>

//       {/* Task Description */}
//       <p className="text-sm text-gray-600 mt-1">{description}</p>
      
//       {/* Status Badge */}
//       <span className={`mt-2 px-2 py-1 text-sm rounded self-end ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
//         {status}
//       </span>

//       {/* Delete Button */}
//       <button 
//         className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//         onClick={onDelete}
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default TodoItem;






// import React from "react";

// const TodoItem = ({ task, description, status }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-md bg-white w-96 flex flex-col justify-between">
//       {/* Task Title */}
//       <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
//         {task}
//       </span>

//       {/* Task Description */}
//       <p className="text-sm text-gray-600 mt-1">{description}</p>
      
//       {/* Status Badge */}
//       <span className={`mt-2 px-2 py-1 text-sm rounded self-end ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
//         {status}
//       </span>
//     </div>
//   );
// };

// export default TodoItem;


