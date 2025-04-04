import { useState } from "react";
import API_BASE_URL from "../config";

const TodoItem = ({ id, task, description, dueDate, status, onDelete, fetchTodos }) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleStatusChange = async () => {
        const token = localStorage.getItem("token");
        const newStatus = currentStatus === "pending" ? "completed" : "pending";

        try {
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error("Failed to update status");

            setCurrentStatus(newStatus);
            fetchTodos();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleEdit = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ title: editedTask, description: editedDescription })
            });

            if (!response.ok) throw new Error("Failed to update task");

            setIsEditing(false);
            fetchTodos();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className={`w-full sm:w-80 p-6 rounded-lg shadow-lg border ${
            currentStatus === "completed" ? "border-green-500 bg-gray-700 opacity-70" : "border-blue-500 bg-gray-900"
        } text-white relative space-y-3`}>

            {currentStatus === "completed" && (
                <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">Completed</span>
            )}

            {isEditing ? (
                <>
                    <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
                    <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded mt-2"/>
                    <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </>
            ) : (
                <>
                    <h3 className={`text-lg font-bold ${currentStatus === "completed" ? "text-green-400 line-through" : "text-blue-400"}`}>
                        {task}
                    </h3>
                    <p className="text-sm text-gray-300">{description}</p>

                    <div className="flex justify-between mt-4">
                        <button onClick={handleStatusChange} className="text-yellow-400 bg-gray-800 px-3 py-1 rounded">
                            {currentStatus === "completed" ? "Mark Pending" : "Mark Completed"}
                        </button>
                        <button onClick={() => setIsEditing(true)} className="text-blue-500">✏️ Edit</button>
                        <button onClick={() => onDelete(id)} className="text-red-500">🗑️ Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;






// import { useState } from "react";
// import API_BASE_URL from "../config";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete, fetchTodos }) => {
//     const [currentStatus, setCurrentStatus] = useState(status);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState(task);
//     const [editedDescription, setEditedDescription] = useState(description);

//     const handleStatusChange = async () => {
//         const token = localStorage.getItem("token");
//         const newStatus = currentStatus === "pending" ? "completed" : "pending";

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (!response.ok) throw new Error("Failed to update status");

//             setCurrentStatus(newStatus);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleEdit = async () => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//                 body: JSON.stringify({ title: editedTask, description: editedDescription })
//             });

//             if (!response.ok) throw new Error("Failed to update task");

//             setIsEditing(false);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     return (
//         <div className={`w-full sm:w-80 p-4 rounded-lg shadow-lg border ${
//             currentStatus === "completed" ? "border-green-500 bg-gray-700 opacity-70" : "border-blue-500 bg-gray-900"
//         } text-white relative`}>
            
//             {currentStatus === "completed" && (
//                 <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">Completed</span>
//             )}

//             {isEditing ? (
//                 <>
//                     <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                     <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded mt-2"/>
//                     <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//                 </>
//             ) : (
//                 <>
//                     <h3 className={`font-bold ${currentStatus === "completed" ? "text-green-400 line-through" : "text-blue-400"}`}>{task}</h3>
//                     <p>{description}</p>
//                     <p className="text-sm text-blue-500">Due: {dueDate || "Not set"}</p>

//                     <div className="flex justify-between mt-2">
//                         <button onClick={handleStatusChange} className="text-yellow-400 bg-gray-800 px-2 py-1 rounded">
//                             {currentStatus === "completed" ? "Mark Pending" : "Mark Completed"}
//                         </button>
//                         <button onClick={() => setIsEditing(true)} className="text-blue-500">✏️ Edit</button>
//                         <button onClick={() => onDelete(id)} className="text-red-500">🗑️ Delete</button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default TodoItem;



// import { useState } from "react";
// import API_BASE_URL from "../config";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete, fetchTodos }) => {
//     const [currentStatus, setCurrentStatus] = useState(status);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState(task);
//     const [editedDescription, setEditedDescription] = useState(description);

//     const handleStatusChange = async (newStatus) => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (!response.ok) throw new Error("Failed to update status");

//             setCurrentStatus(newStatus);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleEdit = async () => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ title: editedTask, description: editedDescription })
//             });

//             if (!response.ok) throw new Error("Failed to update task");

//             setIsEditing(false);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     return (
//         <div className={`w-full sm:w-80 p-4 rounded-lg shadow-lg border ${
//             currentStatus === "completed" ? "border-green-500 bg-gray-700 opacity-70" : "border-blue-500 bg-gray-900"
//         } text-white relative`}>
//             {currentStatus === "completed" && (
//                 <span className="absolute top-2 right-2 bg-green-500 text-xs px-2 py-1 rounded">Completed</span>
//             )}

//             {isEditing ? (
//                 <>
//                     <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                     <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded mt-2"/>
//                     <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//                 </>
//             ) : (
//                 <>
//                     <h3 className={`font-bold ${currentStatus === "completed" ? "text-green-400 line-through" : "text-blue-400"}`}>{task}</h3>
//                     <p>{description}</p>
//                     <p className="text-sm text-blue-500">Due: {dueDate || "Not set"}</p>
//                     <button onClick={() => onDelete(id)} className="text-red-500 mt-2">🗑️ Delete</button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default TodoItem;





// import { useState } from "react";
// import API_BASE_URL from "../config";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete, fetchTodos }) => {
//     const [currentStatus, setCurrentStatus] = useState(status);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedTask, setEditedTask] = useState(task);
//     const [editedDescription, setEditedDescription] = useState(description);

//     const handleStatusChange = async (newStatus) => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (!response.ok) throw new Error("Failed to update status");

//             setCurrentStatus(newStatus);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleEdit = async () => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ title: editedTask, description: editedDescription })
//             });

//             if (!response.ok) throw new Error("Failed to update task");

//             setIsEditing(false);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     return (
//         <div className="w-64 p-4 rounded-lg shadow-lg border border-blue-500 bg-gray-900 text-white relative">
//             {isEditing ? (
//                 <>
//                     <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                     <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="w-full bg-gray-800 text-white border border-blue-500 p-2 rounded mt-2"/>
//                     <button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//                 </>
//             ) : (
//                 <>
//                     <h3 className="font-bold text-blue-400">{task}</h3>
//                     <p>{description}</p>
//                     <p className="text-sm text-blue-500">Due: {dueDate || "Not set"}</p>

//                     {/* Status Dropdown */}
//                     <select value={currentStatus} onChange={(e) => handleStatusChange(e.target.value)} className="mt-2 bg-gray-800 text-white border border-blue-500 p-1 rounded">
//                         <option value="pending">Pending</option>
//                         <option value="completed">Completed</option>
//                     </select>

//                     {/* Buttons */}
//                     <div className="mt-2 flex justify-between">
//                         <button onClick={() => setIsEditing(true)} className="text-yellow-400">✏️ Edit</button>
//                         <button onClick={() => onDelete(id)} className="text-red-500">🗑️ Delete</button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default TodoItem;








// import { useState } from "react";
// import API_BASE_URL from "../config";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete, fetchTodos }) => {
//     const [currentStatus, setCurrentStatus] = useState(status);

//     const handleStatusChange = async (newStatus) => {
//         const token = localStorage.getItem("token");

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (!response.ok) throw new Error("Failed to update status");

//             setCurrentStatus(newStatus);
//             fetchTodos(); // Refresh the todo list
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     return (
//         <div
//             className={`p-4 rounded-lg shadow-md border relative ${
//                 currentStatus === "completed" ? "opacity-60 line-through" : ""
//             }`}
//         >
//             <h3 className="font-bold">{task}</h3>
//             <p>{description}</p>
//             <p className="text-sm text-blue-500">Due: {dueDate || "Not set"}</p>

//             {/* Status Dropdown */}
//             <select
//                 value={currentStatus}
//                 onChange={(e) => handleStatusChange(e.target.value)}
//                 className="mt-2 border p-1 rounded"
//             >
//                 <option value="pending">Pending</option>
//                 <option value="completed">Completed</option>
//             </select>

//             {/* Delete Button */}
//             <button onClick={() => onDelete(id)} className="absolute top-2 right-2 text-red-500">
//                 🗑️
//             </button>
//         </div>
//     );
// };

// export default TodoItem;







// import React, { useState } from "react";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete }) => {
//     const [isEditing, setIsEditing] = useState(false);    
//     const [newTask, setNewTask] = useState(task);
//     const [newDescription, setNewDescription] = useState(description);
//     const [currentStatus, setCurrentStatus] = useState(status);

//     const toggleEdit = () => setIsEditing(!isEditing);

//     const handleUpdate = async () => {
//         const token = localStorage.getItem("token");    
//         const updatedTodo = { title: newTask, description: newDescription };

//         try {
//             await fetch(`http://localhost:5000/api/todos/${id}`, {
//                 method: "PUT",    
//                 headers: { 
//                     "Content-Type": "application/json",    
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(updatedTodo),
//             });
//             toggleEdit();
//         } catch (error) {
//             console.error("Error updating task:", error);    
//         }
//     };

//     const handleStatusChange = async (e) => {
//         const newStatus = e.target.value;    
//         setCurrentStatus(newStatus);

//         const token = localStorage.getItem("token");

//         try {
//             await fetch(`http://localhost:5000/api/todos/${id}`, {
//                 method: "PUT",    
//                 headers: { 
//                     "Content-Type": "application/json",    
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });
//         } catch (error) {
//             console.error("Error updating status:", error);    
//         }
//     };

//     return (
//         <div className={`border p-4 rounded-lg shadow-md w-80 flex flex-col justify-between relative transition-all ${currentStatus === "completed" ? "bg-gray-200 opacity-70" : "bg-white"}`}>    
//             {/* Delete Button */}
//             <button onClick={() => onDelete(id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
//                 🗑️
//             </button>

//             {isEditing ? (
//                 <>    
//                     <input 
//                         type="text" 
//                         value={newTask} 
//                         onChange={(e) => setNewTask(e.target.value)} 
//                         className="border p-1 w-full text-lg font-semibold"
//                     />
//                     <textarea 
//                         value={newDescription} 
//                         onChange={(e) => setNewDescription(e.target.value)} 
//                         className="border p-1 w-full text-sm mt-1"
//                     />
//                     <button onClick={handleUpdate} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
//                         Save
//                     </button>
//                 </>
//             ) : (
//                 <>    
//                     <span className={`text-lg font-semibold ${currentStatus === "completed" ? "line-through text-gray-500" : "text-black"}`}>
//                         {task}
//                     </span>
//                     <p className="text-sm text-gray-600 mt-1">{description}</p>
//                     <p className="text-xs text-blue-600 mt-1">Due: {dueDate}</p>
//                 </>
//             )}

//             {/* Status Dropdown */}
//             <div className="flex justify-between items-center mt-2">
//                 <select
//                     value={currentStatus}
//                     onChange={handleStatusChange}
//                     className="px-2 py-1 text-sm rounded border bg-white cursor-pointer"
//                 >
//                     <option value="pending" className="text-red-700">Pending</option>
//                     <option value="completed" className="text-green-700">Completed</option>
//                 </select>
                
//                 <button onClick={toggleEdit} className="text-blue-500 hover:text-blue-700">
//                     ✏️
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TodoItem;



// import React, { useState } from "react";

// const TodoItem = ({ id, task, description, dueDate, status, onDelete }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [newTask, setNewTask] = useState(task);
//     const [newDescription, setNewDescription] = useState(description);

//     const toggleEdit = () => setIsEditing(!isEditing);

//     const handleUpdate = async () => {
//         const token = localStorage.getItem("token");
//         const updatedTodo = { title: newTask, description: newDescription };

//         try {
//             await fetch(`http://localhost:5000/api/todos/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json",
//                       "Authorization": `Bearer ${token}`
//                  },
//                 body: JSON.stringify(updatedTodo),
//             });
//             toggleEdit();
//         } catch (error) {
//             console.error("Error updating task:", error);
//         }
//     };

//     return (
//         <div className="border p-4 rounded-lg shadow-md bg-white w-80 flex flex-col justify-between relative">
//             {/* Delete Button */}
//             <button onClick={() => onDelete(id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
//                 🗑️
//             </button>

//             {isEditing ? (
//                 <>
//                     <input 
//                         type="text" 
//                         value={newTask} 
//                         onChange={(e) => setNewTask(e.target.value)} 
//                         className="border p-1 w-full text-lg font-semibold"
//                     />
//                     <textarea 
//                         value={newDescription} 
//                         onChange={(e) => setNewDescription(e.target.value)} 
//                         className="border p-1 w-full text-sm mt-1"
//                     />
//                     <button onClick={handleUpdate} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
//                         Save
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <span className={`text-lg font-semibold ${status === "completed" ? "line-through text-gray-500" : "text-black"}`}>
//                         {task}
//                     </span>
//                     <p className="text-sm text-gray-600 mt-1">{description}</p>
//                     <p className="text-xs text-blue-600 mt-1">Due: {dueDate}</p>
//                 </>
//             )}

//             {/* Status Badge */}
//             <div className="flex justify-between items-center mt-2">
//                 <span className={`px-2 py-1 text-sm rounded ${status === "completed" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
//                     {status}
//                 </span>
//                 <button onClick={toggleEdit} className="text-blue-500 hover:text-blue-700">
//                     ✏️
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TodoItem;