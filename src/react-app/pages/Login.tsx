import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  role: string;
};

type LoginResponse = {
  success: boolean;
  token: string;
  user: User;
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      const res = await axios.post<LoginResponse>(
        "https://venture-hubb.onrender.com/api/auth/login", // ✅ FIXED ROUTE
        { email, password }
      );

      console.log("FULL RESPONSE:", res.data);

      const { token, user } = res.data;

      // ✅ Store data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful ✅");

      // ✅ Role-based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 mb-3 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 mb-4 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}