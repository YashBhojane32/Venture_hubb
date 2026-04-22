import { useState } from "react";
import axios from "axios";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        { email, password }
      );

      // 🔥 IMPORTANT: keep same token name everywhere
      localStorage.setItem("token", res.data.token);

      // redirect
      window.location.href = "/admin";

    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enter key support
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

      {/* CARD */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[380px] animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Venture Hub
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Admin Dashboard Login
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-500/20 text-red-200 text-sm p-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          />

          {/* PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* FOOTER */}
        <p className="text-center text-white/60 text-xs mt-6">
          🔐 Secure Admin Access • Venture Hub
        </p>
      </div>
    </div>
  );
}