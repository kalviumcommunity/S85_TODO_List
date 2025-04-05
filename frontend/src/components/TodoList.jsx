import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import API_BASE_URL from "../config";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setTodos(data.sort((a, b) => (a.status === "completed") - (b.status === "completed")));
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleAddTodo = async () => {
        const token = localStorage.getItem("token");
        const newTodo = { title: task, description, dueDate };

        try {
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(newTodo),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            setTask(""); setDescription(""); setDueDate("");
            fetchTodos();
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to delete task");

            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center mt-5 text-white px-4">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">Todo List</h2>

            {/* Input Fields */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-64"/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-64"/>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-40"/>
                <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
            </div>

            {/* Display Todos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
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
                            fetchTodos={fetchTodos}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">No todos available</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;



// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem";
// import API_BASE_URL from "../config";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [task, setTask] = useState("");
//     const [description, setDescription] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();

//             // Sort: Pending first, Completed last
//             const sortedTodos = data.sort((a, b) => (a.status === "completed") - (b.status === "completed"));
//             setTodos(sortedTodos);
//         } catch (error) {
//             console.error("Error fetching todos:", error);
//         }
//     };

//     const handleAddTodo = async () => {
//         const token = localStorage.getItem("token");
//         const newTodo = { title: task, description, dueDate };

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(newTodo),
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             setTask("");
//             setDescription("");
//             setDueDate("");
//             fetchTodos();
//         } catch (error) {
//             console.error("Failed to add task:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error("Failed to delete task");

//             setTodos(todos.filter(todo => todo._id !== id));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (error) return <div className="text-red-500">Error: {error}</div>;

//     return (
//         <div className="flex flex-col items-center mt-5 text-white px-4">
//             <h2 className="text-3xl font-bold mb-4 text-blue-400">Todo List</h2>

//             {/* Input Fields */}
//             <div className="flex flex-wrap gap-2 justify-center mb-4">
//                 <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-64"/>
//                 <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-64"/>
//                 <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded w-40"/>
//                 <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
//             </div>

//             {/* Display Todos */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
//                 {todos.length > 0 ? (
//                     todos.map(todo => (
//                         <TodoItem 
//                             key={todo._id} 
//                             id={todo._id}
//                             task={todo.title} 
//                             description={todo.description} 
//                             dueDate={todo.dueDate}
//                             status={todo.status} 
//                             onDelete={handleDelete}
//                             fetchTodos={fetchTodos}
//                         />
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center w-full">No todos available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TodoList;





// import { useEffect, useState } from "react";
// import TodoItem from "./TodoItem";
// import API_BASE_URL from "../config";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [task, setTask] = useState("");
//     const [description, setDescription] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             const data = await response.json();
//             const sortedTodos = data.sort((a, b) => (a.status === "completed") - (b.status === "completed"));
//             setTodos(data);
//         } catch (error) {
//             console.error("Error fetching todos:", error);
//         }
//     };

//     const handleAddTodo = async () => {
//         const token = localStorage.getItem("token");
//         const newTodo = { title: task, description, dueDate };

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(newTodo),
//             });

//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//             setTask("");
//             setDescription("");
//             setDueDate("");
//             fetchTodos();
//         } catch (error) {
//             console.error("Failed to add task:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem("token");
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error("Failed to delete task");

//             setTodos(todos.filter(todo => todo._id !== id));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     if (error) return <div className="text-red-500">Error: {error}</div>;

//     return (
//         <div className="flex flex-col items-center mt-5 text-white">
//             <h2 className="text-3xl font-bold mb-4 text-blue-400">Todo List</h2>

//             {/* Input Fields */}
//             <div className="flex space-x-2 mb-4">
//                 <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                 <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                 <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-gray-800 text-white border border-blue-500 p-2 rounded"/>
//                 <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
//             </div>

//             {/* Display Todos */}
//             <div className="grid grid-cols-3 gap-4">
//                 {todos.length > 0 ? (
//                     todos.map(todo => (
//                         <TodoItem 
//                             key={todo._id} 
//                             id={todo._id}
//                             task={todo.title} 
//                             description={todo.description} 
//                             dueDate={todo.dueDate}
//                             status={todo.status} 
//                             onDelete={handleDelete}
//                             fetchTodos={fetchTodos}
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
// import API_BASE_URL from "../config";

// const TodoList = () => {
//     const [todos, setTodos] = useState([]);
//     const [task, setTask] = useState("");
//     const [description, setDescription] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         try {
//             const token = localStorage.getItem("token");  // Get token from localStorage
    
//             // const response = await fetch("http://localhost:5000/api/todos", {
//             const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // Attach token
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
    
//             const data = await response.json();
//             console.log("Fetched Todos:", data);
//             setTodos(data)
//         } catch (error) {
//             console.error("Error fetching todos:", error);
//         }
//     };
    
//     const handleAddTodo = async () => {
//         const token = localStorage.getItem("token");
//         const newTodo = {
//             title: task,
//             description: description,
//             dueDate: dueDate
//         };
    
//         try {
//             // const response = await fetch(`${API_BASE_URL}/api/todos`, {
//                 const response = await fetch(`http://localhost:5000/api/todos`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // Ensure token is sent
//                 },
//                 body: JSON.stringify(newTodo),
//             });
    
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
//             const data = await response.json();
//             console.log("Task added:", data);
    
//             // Clear input fields
//             setTask("");
//             setDescription("");
//             setDueDate("");
    
//             // Refresh todos after adding
//             fetchTodos();
//         } catch (error) {
//             console.error("Failed to add task:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem("token");
//         try {
//             // const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, { 
//                 const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
    
//             if (!response.ok) throw new Error("Failed to delete task");
    
//             // Update state after successful deletion
//             setTodos(todos.filter(todo => todo._id !== id));
//         } catch (error) {
//             setError(error.message);
//         }
//     };


//     if (error) return <div className="text-red-500">Error: {error}</div>;

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
//                     [...todos]
//                         .sort((a, b) => (a.status === "completed") - (b.status === "completed"))
//                         .map(todo => (
                    
//                     // todos.map(todo => (
//                         <TodoItem 
//                             key={todo._id} 
//                             id={todo._id}
//                             task={todo.title} 
//                             description={todo.description} 
//                             dueDate={todo.dueDate}
//                             status={todo.status} 
//                             onDelete={handleDelete}
//                             fetchTodos={fetchTodos}
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
