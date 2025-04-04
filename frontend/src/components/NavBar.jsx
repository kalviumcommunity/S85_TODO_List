// NavBar.jsx
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-black text-blue-400 p-4 flex justify-between shadow-lg">
            <h1 className="text-lg font-bold">ASAP TODO</h1>
            <div className="space-x-4">
                <Link to="/todos" className="hover:text-blue-300">Todos</Link>
                <Link to="/signup" className="hover:text-blue-300">Signup</Link>
                <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
            </div>
        </nav>
    );
}

export default NavBar;

// import { Link, useNavigate } from "react-router-dom";

// function NavBar() {
//     const navigate = useNavigate();
    
//     const handleLogout = () => {
//         localStorage.removeItem("token"); // Remove the auth token
//         navigate("/"); // Redirect to login page
//     };

//     return (
//         <nav className="bg-gray-800 text-white p-4 flex justify-between">
//             <h1 className="text-lg font-bold">ASAP TODO</h1>
//             <div className="space-x-4">
//                 <Link to="/todos" className="hover:underline">Todos</Link>
//                 <Link to="/signup" className="hover:underline">Signup</Link>
//                 <button onClick={handleLogout} className="hover:underline">Logout</button>
//             </div>
//         </nav>
//     );
// }

// export default NavBar;
