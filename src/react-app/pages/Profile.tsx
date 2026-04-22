import { useNavigate } from "react-router";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">My Profile 👤</h1>

      <div className="bg-white/10 p-6 rounded-xl max-w-md">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
}