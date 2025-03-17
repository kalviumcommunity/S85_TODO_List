import "./index.css";
import ASAPCard from "./components/ASAPCard";
import TodoItem from "./components/TODOItem";

function App() {

  const dummyTodo = {
    task: "Complete ASAP Project",
    status: "pending"
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 space-y-6">
      <ASAPCard />
      <TodoItem {...dummyTodo} />
    </div>
  );
}

export default App;
