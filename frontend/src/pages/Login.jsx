import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/todos");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
