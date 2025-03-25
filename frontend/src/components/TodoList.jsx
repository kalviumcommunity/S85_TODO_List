import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import API_BASE_URL from "../config";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem("token");  // Get token from localStorage
    
            // const response = await fetch("http://localhost:5000/api/todos", {
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Attach token
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Fetched Todos:", data);
            setTodos(data)
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };
    
    const handleAddTodo = async () => {
        const token = localStorage.getItem("token");
        const newTodo = {
            title: task,
            description: description,
            dueDate: dueDate
        };
    
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Ensure token is sent
                },
                body: JSON.stringify(newTodo),
            });
    
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            const data = await response.json();
            console.log("Task added:", data);
    
            // Clear input fields
            setTask("");
            setDescription("");
            setDueDate("");
    
            // Refresh todos after adding
            fetchTodos();
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };
    

    // const handleAddTodo = async () => {
    //     const token = localStorage.getItem("token");
    //     const newTodo = {
    //         title: task,
    //         description: description,
    //         dueDate: dueDate
    //     };
    
    //     try {
    //         // const response = await fetch("http://localhost:5000/api/todos", {
    //             const response = await fetch(`${API_BASE_URL}/api/todos`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}` // Ensure token is sent
    //             },
    //             body: JSON.stringify(newTodo),
    //         });
    
    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    //         const data = await response.json();
    //         console.log("Task added:", data);
    //     } catch (error) {
    //         console.error("Failed to add task:", error);
    //     }
    // };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, { 
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) throw new Error("Failed to delete task");
    
            // Update state after successful deletion
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };
    

    // const handleDelete = async (id) => {
    //     const token = localStorage.getItem("token");
    //     try {
    //         // const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
    //             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, { 

    //              method: "DELETE",
    //              headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}` // Ensure token is sent
    //             }
    //              });
    //         if (!response.ok) throw new Error("Failed to delete task");

    //         setTodos(todos.filter(todo => todo._id !== id));
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };

    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center mt-5">
            <h2 className="text-2xl font-bold mb-4">Todo List</h2>

            {/* Input Fields */}
            <div className="flex space-x-2 mb-4">
                <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} className="border p-2 rounded"/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded"/>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 rounded"/>
                <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            </div>

            {/* Display Todos */}
            <div className="grid grid-cols-3 gap-4">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <TodoItem 
                            key={todo._id} 
                            id={todo._id}
                            task={todo.title} 
                            description={todo.description} 
                            dueDate={todo.dueDate}
                            status={todo.status} 
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No todos available</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;



// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/todos")  
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 return response.json();
//             })
//             .then(data => setTodos(data))
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setError(error.message);
//             });
//     }, []);

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div className="flex flex-col items-center mt-2"> 
//             <h2 className="text-2xl font-bold mb-4">Todo List</h2>
//             <div className="grid grid-cols-3 gap-4">
//                 {todos.length > 0 ? (
//                     todos.map(todo => (
//                         <TodoItem 
//                             key={todo._id} 
//                             id={todo._id}
//                             task={todo.title} 
//                             description={todo.description} 
//                             status={todo.status} 
//                         />
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No todos available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TodoList;




// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [task, setTask] = useState("");
//     const [description, setDescription] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/todos")
//             .then(response => response.json())
//             .then(data => setTodos(data))
//             .catch(error => setError(error.message));
//     }, []);

//     const handleAddTodo = async () => {
//         if (!task || !description || !dueDate) return alert("All fields are required!");
        
//         const newTodo = { title: task, description, dueDate, status: "pending" };

//         const response = await fetch("http://localhost:5000/api/todos", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newTodo),
//         });

//         if (response.ok) {
//             const addedTodo = await response.json();
//             setTodos([...todos, addedTodo]);
//             setTask(""); setDescription(""); setDueDate("");
//         }
//     };

//     return (
//         <div className="flex flex-col items-center mt-5">
//             <h2 className="text-2xl font-bold mb-4">Todo List</h2>
            
//             {/* Input Fields */}
//             <div className="flex space-x-2 mb-4">
//                 <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} className="border p-2 rounded"/>
//                 <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded"/>
//                 <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 rounded"/>
//                 <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
//             </div>

//             {/* Display Todos */}
//             <div className="grid grid-cols-3 gap-4">
//                 {todos.length > 0 ? (
//                     todos.map(todo => (
//                         <TodoItem 
//                             key={todo._id} 
//                             todo={todo} 
//                             setTodos={setTodos} 
//                             todos={todos} 
//                         />
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No todos available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TodoList;




// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [error, setError] = useState(null);
//     const [newTask, setNewTask] = useState("");

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = () => {
//         fetch("http://localhost:5000/api/todos")
//             .then(response => response.json())
//             .then(data => setTodos(data))
//             .catch(error => setError(error.message));
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
//             if (!response.ok) throw new Error("Failed to delete todo");

//             setTodos(todos.filter(todo => todo._id !== id));  // Remove from UI
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const handleAddTask = async () => {
//         if (!newTask.trim()) return;

//         try {
//             const response = await fetch("http://localhost:5000/api/todos", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ title: newTask, description: "", status: "pending" }),
//             });

//             if (!response.ok) throw new Error("Failed to add todo");

//             const newTodo = await response.json();
//             setTodos([...todos, newTodo]);  // Add to UI
//             setNewTask("");  // Clear input
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div className="flex flex-col items-center space-y-4 mt-5">
//             <h2 className="text-2xl font-bold">Todo List</h2>

//             {/* Add Task Form */}
//             <div className="flex space-x-2">
//                 <input 
//                     type="text" 
//                     placeholder="Add a new task..." 
//                     value={newTask} 
//                     onChange={(e) => setNewTask(e.target.value)}
//                     className="border p-2 rounded-lg w-64"
//                 />
//                 <button 
//                     onClick={handleAddTask} 
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Add
//                 </button>
//             </div>

//             {/* List of Tasks */}
//             {todos.length > 0 ? (
//                 todos.map(todo => (
//                     <TodoItem 
//                         key={todo._id} 
//                         task={todo.title} 
//                         description={todo.description} 
//                         status={todo.status} 
//                         onDelete={() => handleDelete(todo._id)} 
//                     />
//                 ))
//             ) : (
//                 <p className="text-gray-500">No todos available</p>
//             )}
//         </div>
//     );
// };

// export default TodoList;


// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem"; // Import the TodoItem component

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/todos")  // Ensure backend route is correct
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 return response.json();
//             })
//             .then(data => setTodos(data))
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//                 setError(error.message);
//             });
//     }, []);

//     if (error) {
//         return <div className="text-red-500">Error: {error}</div>;
//     }

//     return (
//         <div className="flex flex-col items-center space-y-4 mt-5">
//             <h2 className="text-2xl font-bold">Todo List</h2>
//             {todos.length > 0 ? (
//                 todos.map(todo => (
//                     <TodoItem 
//                         key={todo._id} 
//                         task={todo.title} 
//                         description={todo.description} 
//                         status={todo.status} 
//                     />
//                 ))
//             ) : (
//                 <p className="text-gray-500">No todos available</p>
//             )}
//         </div>
//     );
// };

// export default TodoList;
