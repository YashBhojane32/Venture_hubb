import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Users, Calendar, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  // 📌 Menu Items
  const menu = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Places", path: "/admin/places", icon: MapPin },
    { name: "Applications", path: "/admin/applications", icon: Users },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  ];

  return (
    <div className="w-64 h-screen bg-card border-r border-border p-5 flex flex-col">

      {/* 🔥 LOGO */}
      <h2 className="text-2xl font-bold text-gradient mb-8">
        Venture Hub
      </h2>

      {/* 🔥 MENU */}
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;

          // ✅ Active route detection
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-muted font-semibold"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 🔻 BOTTOM */}
      <div className="mt-auto">

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>

        <p className="text-xs text-muted-foreground mt-4">
          Admin Panel © {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}