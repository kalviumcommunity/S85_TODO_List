import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <div className="flex flex-col min-h-screen bg-[url('/background2.webp')] bg-cover bg-center bg-no-repeat">
                    <NavBar />  {/* Add a Navigation Bar */}
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/todos" element={<TodoList />} />
                    </Routes>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;






// import "./index.css";
// import ASAPCard from "./components/ASAPCard";
// import TodoItem from "./components/TodoItem";
// import TodoList from "./components/TodoList";
// import ErrorBoundary from "./components/ErrorBoundary"; // Import the Error Boundary

// function App() {
//     return (
//         <ErrorBoundary>
//             <div className="flex flex-col justify-center items-center min-h-screen space-y-6 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
//                 <TodoList />
//             </div>
//         </ErrorBoundary>
//     );
// }

// export default App;
