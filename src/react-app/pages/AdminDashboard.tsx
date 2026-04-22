import { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  MapPin,
  BarChart3,
  Users,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

type Place = {
  _id: string;
  title: string;
  location: string;
  category: string;
  price: number;
};

type Booking = {
  _id: string;
  user: { name: string; email: string };
  place: { title: string; location: string };
  date: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

// Stats Card Component
const Card = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition">{value}</p>
      </div>
      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [places, setPlaces] = useState<Place[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [analytics, setAnalytics] = useState({
    users: 0,
    bookings: 0,
    revenue: 0,
    places: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [newPlace, setNewPlace] = useState({
    title: "",
    location: "",
    category: "fort",
    price: 0,
  });

  const token = localStorage.getItem("token");
  const authHeader = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    if (!token) {
      console.error("❌ No token found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [placesRes, analyticsRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/places", authHeader),
        axios.get("http://localhost:5000/api/admin/analytics", authHeader),
        axios.get("http://localhost:5000/api/admin/bookings", authHeader),
      ]);

      setPlaces(Array.isArray(placesRes.data.data) ? placesRes.data.data : placesRes.data || []);
      setAnalytics(analyticsRes.data.data || analyticsRes.data || {});
      setBookings(Array.isArray(bookingsRes.data.bookings) ? bookingsRes.data.bookings : bookingsRes.data || []);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlace = async () => {
    if (!token || !newPlace.title.trim() || !newPlace.location.trim()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/places", newPlace, authHeader);
      setShowAddModal(false);
      setNewPlace({ title: "", location: "", category: "fort", price: 0 });
      fetchAllData();
    } catch (err) {
      console.error("❌ Add Error:", err);
    }
  };

  const handleDeletePlace = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this place?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/places/${id}`, authHeader);
      setPlaces((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Delete Error:", err);
      fetchAllData(); // Refresh on error
    }
  };

  const updateBookingStatus = async (bookingId: string, status: "pending" | "confirmed" | "cancelled") => {
    if (!token) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        { status },
        authHeader
      );
      fetchAllData();
    } catch (err) {
      console.error("❌ Status update error:", err);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!token || !confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/admin/bookings/${bookingId}`, authHeader);
      fetchAllData();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const filteredPlaces = places.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = !statusFilter || b.status === statusFilter;
    const matchesSearch = !search ||
      b.place?.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-10">Venture Hub</h2>
          <nav className="flex flex-col gap-4 text-gray-700">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-600 font-medium shadow-sm"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard size={18} /> Dashboard
            </div>
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                activeTab === "places"
                  ? "bg-blue-100 text-blue-600 font-medium shadow-sm"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("places")}
            >
              <MapPin size={18} /> Places
            </div>
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                activeTab === "bookings"
                  ? "bg-emerald-100 text-emerald-600 font-medium shadow-sm"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <Calendar size={18} /> Bookings
            </div>
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                activeTab === "analytics"
                  ? "bg-purple-100 text-purple-600 font-medium shadow-sm"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 size={18} /> Analytics
            </div>
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {activeTab === "bookings" ? "Bookings" : activeTab.replace("-", " ")}
            </h1>
            <p className="text-gray-500">Manage your platform</p>
          </div>
          {activeTab === "places" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all"
            >
              <Plus size={20} /> Add Place
            </button>
          )}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              title="Total Places"
              value={places.length}
              icon={<MapPin className="h-8 w-8 text-blue-500" />}
            />
            <Card
              title="Bookings"
              value={bookings.length}
              icon={<Calendar className="h-8 w-8 text-emerald-500" />}
            />
            <Card
              title="Revenue"
              value={`₹${(analytics.revenue || 0).toLocaleString()}`}
              icon={<DollarSign className="h-8 w-8 text-green-500" />}
            />
            <Card
              title="Users"
              value={analytics.users || 0}
              icon={<Users className="h-8 w-8 text-purple-500" />}
            />
          </div>
        )}

        {/* PLACES TAB */}
        {activeTab === "places" && (
          <div>
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border">
              <Search size={20} className="text-gray-400 flex-shrink-0" />
              <input
                placeholder="Search places..."
                className="flex-1 outline-none text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="p-5 text-right text-sm font-semibold text-gray-700">Price</th>
                    <th className="p-5 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlaces.map((place) => (
                    <tr key={place._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-5 font-medium text-gray-900">{place.title}</td>
                      <td className="p-5 text-gray-600">{place.location}</td>
                      <td className="p-5">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                          {place.category}
                        </span>
                      </td>
                      <td className="p-5 text-right font-bold text-emerald-600">
                        ₹{place.price.toLocaleString()}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePlace(place._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete place"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPlaces.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-500">
                        No places found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6 bg-white p-6 rounded-xl shadow-sm border">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="pending">
                  Pending ({bookings.filter((b) => b.status === "pending").length})
                </option>
                <option value="confirmed">
                  Confirmed ({bookings.filter((b) => b.status === "confirmed").length})
                </option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="text"
                placeholder="Search bookings..."
                className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Customer</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Place</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Guests</th>
                    <th className="p-5 text-right text-sm font-semibold text-gray-700">Amount</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="p-5 text-right text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-5">
                        <div className="font-medium text-gray-900">
                          {booking.user?.name || "Guest"}
                        </div>
                        <div className="text-sm text-gray-500">{booking.user?.email || "N/A"}</div>
                      </td>
                      <td className="p-5">
                        <div className="font-medium">{booking.place?.title || "N/A"}</div>
                        <div className="text-sm text-gray-500">{booking.place?.location || ""}</div>
                      </td>
                      <td className="p-5">
                        {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="p-5 font-semibold">{booking.guests || 0}</td>
                      <td className="p-5 text-right font-bold text-emerald-600">
                        ₹{(booking.totalPrice || 0).toLocaleString()}
                      </td>
                      <td className="p-5">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateBookingStatus(booking._id, e.target.value as "pending" | "confirmed" | "cancelled")
                          }
                          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : booking.status === "pending"
                              ? "bg-orange-100 text-orange-800 border-orange-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete booking"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-gray-500">
                        <Calendar size={64} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                        <p>Try adjusting your filters</p>
                      </td>
                    </tr