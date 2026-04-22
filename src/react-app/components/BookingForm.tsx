import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/react-app/api";

type Props = {
  placeId: string;
  placeName: string;
  price: number;
  image?: string;
};

export default function BookingForm({ placeId, placeName, price, image }: Props) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const totalPrice = price * guests;
  const today = new Date().toISOString().split("T")[0];
  const MAX_GUESTS = 10;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    let parsedUserId = null;
    
    if (userData) {
      try {
        const userObj = JSON.parse(userData);
        parsedUserId = userObj.id || userObj._id;
      } catch (e) {
        parsedUserId = userData;
      }
    }
    
    const savedToken = localStorage.getItem("token");
    
    if (savedToken && parsedUserId) {
      setToken(savedToken);
      setUserId(parsedUserId);
      setIsAuthenticated(true);
    }
  }, []);

  const handleBooking = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    if (!date) {
      setError("Please select date");
      return;
    }

    setLoading(true);

    try {
      // 🔥 PERFECT MATCH FOR YOUR models/booking.js
      const bookingData = {
        user: userId,           // ✅ Matches schema.user
        place: placeId,         // ✅ Matches schema.place  
        date: date,             // ✅ Matches schema.date
        guests: Number(guests), // ✅ Matches schema.guests
        totalPrice: Number(totalPrice), // ✅ Matches schema.totalPrice
        status: "pending"       // ✅ Matches schema.status
      };

      console.log("📤 PERFECT MATCH:", bookingData);

      const res = await API.post("/bookings", bookingData, {
        headers: { 
          Authorization: `Bearer ${token!}`,
          "Content-Type": "application/json"
        },
        timeout: 10000
      });

      console.log("✅ BOOKING CREATED:", res.data);
      setSuccess("🎉 Adventure booked successfully!");
      
      setTimeout(() => {
        navigate("/booking-success", {
          state: { 
            _id: res.data._id,
            placeId, placeName, date, guests, totalPrice, image 
          }
        });
      }, 1500);

      setDate("");
      setGuests(1);
    } catch (err: any) {
      console.error("🚨 ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login", { state: { from: `/destination/${placeId}` } });
  };

  return (
    <form onSubmit={handleBooking} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-lg text-green-200 text-sm">
          {success}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Date</label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-gray-600 focus:border-indigo-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Guests</label>
        <input
          type="number"
          min={1}
          max={MAX_GUESTS}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-black/30 border border-gray-600 focus:border-emerald-400"
          required
        />
      </div>

      <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/50 mb-6">
        <div className="text-2xl font-bold text-green-400">₹{totalPrice}</div>
        <div className="text-sm text-green-300">{guests} guest{guests > 1 ? 's' : ''}</div>
      </div>

      <button
        type="submit"
        disabled={loading || !date}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          loading || !date
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-105 shadow-lg"
        }`}
      >
        {loading ? "Processing..." : "🚀 Confirm Booking"}
      </button>
    </form>
  );
}