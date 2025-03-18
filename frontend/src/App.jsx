import "./index.css";
import ASAPCard from "./components/ASAPCard";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import ErrorBoundary from "./components/ErrorBoundary"; // Import the Error Boundary

function App() {
    return (
        <ErrorBoundary>
            <div className="flex flex-col justify-center items-center min-h-screen space-y-6 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
                <TodoList />
            </div>
        </ErrorBoundary>
    );
}

export default App;
