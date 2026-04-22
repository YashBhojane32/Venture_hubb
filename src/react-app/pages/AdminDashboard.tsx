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
};

const API = "https://venture-hubb.onrender.com";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [places, setPlaces] = useState<Place[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [analytics, setAnalytics] = useState({
    users: 0,
    bookings: 0,
    revenue: 0,
  });

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
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [placesRes, analyticsRes, bookingsRes] = await Promise.all([
        axios.get(`${API}/api/places`, authHeader),
        axios.get(`${API}/api/admin/analytics`, authHeader),
        axios.get(`${API}/api/admin/bookings`, authHeader),
      ]);

      setPlaces(placesRes.data.data || []);
      setAnalytics(analyticsRes.data.data || {});
      setBookings(bookingsRes.data.bookings || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPlace = async () => {
    try {
      await axios.post(`${API}/api/places`, newPlace, authHeader);
      setShowAddModal(false);
      fetchAllData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlace = async (id: string) => {
    await axios.delete(`${API}/api/places/${id}`, authHeader);
    fetchAllData();
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await axios.patch(
      `${API}/api/admin/bookings/${id}/status`,
      { status },
      authHeader
    );
    fetchAllData();
  };

  const deleteBooking = async (id: string) => {
    await axios.delete(`${API}/api/admin/bookings/${id}`, authHeader);
    fetchAllData();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white p-6 border-r">
        <h2 className="text-xl font-bold mb-6">Venture Hub</h2>

        <div onClick={() => setActiveTab("dashboard")} className="mb-3 cursor-pointer">Dashboard</div>
        <div onClick={() => setActiveTab("places")} className="mb-3 cursor-pointer">Places</div>
        <div onClick={() => setActiveTab("bookings")} className="mb-3 cursor-pointer">Bookings</div>
        <div onClick={() => setActiveTab("analytics")} className="mb-3 cursor-pointer">Analytics</div>

        <button onClick={logout} className="text-red-500 mt-10">Logout</button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-4 gap-4">
            <div>Places: {places.length}</div>
            <div>Bookings: {bookings.length}</div>
            <div>Revenue: ₹{analytics.revenue}</div>
            <div>Users: {analytics.users}</div>
          </div>
        )}

        {/* PLACES */}
        {activeTab === "places" && (
          <div>
            <button onClick={() => setShowAddModal(true)}>Add Place</button>

            {places.map((p) => (
              <div key={p._id} className="border p-2 mt-2 flex justify-between">
                <div>{p.title} - ₹{p.price}</div>
                <button onClick={() => handleDeletePlace(p._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <div>
            {bookings.map((b) => (
              <div key={b._id} className="border p-2 mt-2">
                <div>{b.user?.name} - {b.place?.title}</div>

                <select
                  value={b.status}
                  onChange={(e) =>
                    updateBookingStatus(b._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button onClick={() => deleteBooking(b._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div>
            <h2>Revenue: ₹{analytics.revenue}</h2>
          </div>
        )}

      </main>

      {/* MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6">
            <input
              placeholder="Title"
              onChange={(e) =>
                setNewPlace({ ...newPlace, title: e.target.value })
              }
            />
            <input
              placeholder="Location"
              onChange={(e) =>
                setNewPlace({ ...newPlace, location: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) =>
                setNewPlace({ ...newPlace, price: Number(e.target.value) })
              }
            />

            <button onClick={handleAddPlace}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}