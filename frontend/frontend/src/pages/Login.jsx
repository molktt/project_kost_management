import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white w-full py-2 rounded"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}