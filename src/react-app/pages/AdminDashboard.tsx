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

const Card = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-xl">
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

  // Clear search when switching tabs to prevent empty states
  useEffect(() => {
    setSearch("");
  }, [activeTab]);

  const fetchAllData = async () => {
    if (!token) {
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
      setAnalytics(analyticsRes.data.data || analyticsRes.data || { users: 0, bookings: 0, revenue: 0 });
      setBookings(Array.isArray(bookingsRes.data.bookings) ? bookingsRes.data.bookings : bookingsRes.data || []);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlace = async () => {
    if (!token || !newPlace.title.trim() || !newPlace.location.trim()) return;
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
    if (!token || !confirm("Are you sure you want to delete this place?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/places/${id}`, authHeader);
      setPlaces((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Delete Error:", err);
      fetchAllData();
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking["status"]) => {
    if (!token) return;
    try {
      await axios.patch(`http://localhost:5000/api/admin/bookings/${bookingId}/status`, { status }, authHeader);
      fetchAllData();
    } catch (err) {
      console.error("❌ Status update error:", err);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!token || !confirm("Are you sure you want to delete this booking?")) return;
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
    p.title?.toLowerCase().includes(search.toLowerCase())
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
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-10 tracking-tight">Venture Hub</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
              { id: "places", icon: MapPin, label: "Places" },
              { id: "bookings", icon: Calendar, label: "Bookings" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeTab === tab.id ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all font-medium">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          {activeTab === "places" && (
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-all">
              <Plus size={18} /> Add Place
            </button>
          )}
        </div>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Places" value={places.length} icon={<MapPin className="text-blue-500" />} />
            <Card title="Bookings" value={bookings.length} icon={<Calendar className="text-emerald-500" />} />
            <Card title="Revenue" value={`₹${(analytics.revenue || 0).toLocaleString()}`} icon={<DollarSign className="text-green-500" />} />
            <Card title="Users" value={analytics.users || 0} icon={<Users className="text-purple-500" />} />
          </div>
        )}

        {activeTab === "places" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border">
              <Search size={18} className="text-gray-400" />
              <input placeholder="Search places..." className="flex-1 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Location</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlaces.map((place) => (
                    <tr key={place._id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{place.title}</td>
                      <td className="p-4 text-gray-500">{place.location}</td>
                      <td className="p-4 font-bold text-emerald-600">₹{place.price.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeletePlace(place._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="flex gap-4 bg-white p-3 rounded-xl border">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent outline-none border-r pr-4">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input placeholder="Search customer or place..." className="flex-1 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600">Customer</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Place</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
                    <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 text-sm">
                        <div className="font-semibold">{booking.user?.name}</div>
                        <div className="text-gray-400">{booking.user?.email}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="font-medium">{booking.place?.title}</div>
                        <div className="text-gray-400 text-xs">{new Date(booking.date).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 font-bold text-emerald-600">₹{booking.totalPrice?.toLocaleString()}</td>
                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value as Booking["status"])}
                          className={`text-xs font-bold px-2 py-1 rounded-md border ${
                            booking.status === "confirmed" ? "bg-green-50 text-green-700 border-green-200" : 
                            booking.status === "pending" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteBooking(booking._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white p-10 rounded-xl border text-center">
            <BarChart3 className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-800">Advanced Insights</h3>
            <p className="text-gray-500">Visualization modules are being initialized.</p>
          </div>
        )}
      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-6">Create New Destination</h2>
            <div className="space-y-4">
              <input className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Place Title" value={newPlace.title} onChange={(e) => setNewPlace({...newPlace, title: e.target.value})} />
              <input className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Location" value={newPlace.location} onChange={(e) => setNewPlace({...newPlace, location: e.target.value})} />
              <input className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Price" value={newPlace.price} onChange={(e) => setNewPlace({...newPlace, price: Number(e.target.value)})} />
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 text-gray-500 font-medium">Cancel</button>
                <button onClick={handleAddPlace} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Save Place</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}