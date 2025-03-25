import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users/signup", { name, email, password });
            alert("Signup successful. Please login.");
            navigate("/");
        } catch (err) {
            alert("Error signing up");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4">Signup</h2>
                <input className="border p-2 w-full mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
