import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Booking = {
  _id: string;
  totalPrice: number;
  status: string;
};

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name} 👋
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* HERO CARD */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Ready for your next trip? 🌍
        </h2>
        <p className="text-sm text-white/80 mb-4">
          Explore hidden destinations across Maharashtra with Venture Hub
        </p>

        <button
          onClick={() => navigate("/destinations")}
          className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
        >
          Explore Places
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 p-5 rounded-xl backdrop-blur-lg">
          <p className="text-gray-300 text-sm">Total Bookings</p>
          <h2 className="text-2xl font-bold">{bookings.length}</h2>
        </div>

        <div className="bg-white/10 p-5 rounded-xl backdrop-blur-lg">
          <p className="text-gray-300 text-sm">Total Spent</p>
          <h2 className="text-2xl font-bold">
            ₹{bookings.reduce((acc, b) => acc + b.totalPrice, 0)}
          </h2>
        </div>

        <div className="bg-white/10 p-5 rounded-xl backdrop-blur-lg">
          <p className="text-gray-300 text-sm">Active Trips</p>
          <h2 className="text-2xl font-bold">
            {bookings.filter((b) => b.status === "confirmed").length}
          </h2>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/my-bookings")}
          className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl shadow hover:scale-105 transition"
        >
          <h3 className="text-lg font-semibold">My Bookings</h3>
          <p className="text-sm mt-2">View & manage bookings</p>
        </div>

        <div
          onClick={() => navigate("/destinations")}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl shadow hover:scale-105 transition"
        >
          <h3 className="text-lg font-semibold">Explore</h3>
          <p className="text-sm mt-2">Discover new places</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-sm mt-2">Edit your details</p>
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        {bookings.slice(0, 3).map((b) => (
          <div
            key={b._id}
            className="bg-white/10 p-4 rounded-lg mb-3 flex justify-between"
          >
            <span>Booking #{b._id.slice(-5)}</span>
            <span className="text-green-400">₹{b.totalPrice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}