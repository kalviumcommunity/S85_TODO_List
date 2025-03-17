const ASAPCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm flex flex-col items-center">
        <h1 className="text-6xl font-bold text-yellow-400">Shivansh</h1>
        <h1 className="text-6xl font-bold text-yellow-400">Garg</h1>

        <h2 className="text-xl text-blue-600 mt-2">ASAP Project</h2>
        <p className="text-gray-700 mt-4 text-center">
          A powerful and simple TODO list to help manage tasks efficiently.
        </p>

        <button className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded">
          Tailwind is working
        </button>
      </div>
    </div>
  );
};

export default ASAPCard;
