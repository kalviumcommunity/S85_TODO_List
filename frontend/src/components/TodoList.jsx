import { useEffect, useState } from "react";
import TodoItem from "./TodoItem"; // Import the TodoItem component

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/todos")  // Ensure backend route is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => setTodos(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center space-y-4 mt-5">
            <h2 className="text-2xl font-bold">Todo List</h2>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <TodoItem 
                        key={todo._id} 
                        task={todo.title} 
                        description={todo.description} 
                        status={todo.status} 
                    />
                ))
            ) : (
                <p className="text-gray-500">No todos available</p>
            )}
        </div>
    );
};

export default TodoList;
