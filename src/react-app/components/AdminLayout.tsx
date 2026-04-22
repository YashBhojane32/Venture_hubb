import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  FileText,
  Calendar,
  LogOut,
} from "lucide-react";
import { useEffect } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    }
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  // 📌 Navigation Items
  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Places", path: "/admin/places", icon: MapPin },
    { name: "Applications", path: "/admin/applications", icon: FileText },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-black to-gray-900 text-white p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-8 tracking-wide">
          Venture Hub
        </h2>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            // ✅ Better active logic
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-300"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 👤 ADMIN INFO */}
        <div className="text-xs text-gray-400 mb-4">
          Logged in as <br />
          <span className="text-white font-semibold">
            Admin
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Admin Panel 🚀
          </h1>

          <div className="text-sm text-gray-500">
            Welcome back 👋
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}