import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

type Booking = {
  _id: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: string;
  place: {
    title: string;
    location: string;
    price: number;
    images?: string[];
  };
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        authHeader
      );

      setBookings(res.data.data || []);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 Cancel Booking (Professional)
  const cancelBooking = async (id: string) => {
    try {
      setCancelLoading(id);

      await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        authHeader
      );

      // instant UI update (better UX)
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (error) {
      console.error("❌ Cancel Error:", error);
    } finally {
      setCancelLoading(null);
    }
  };

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" />
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Bookings 🚀
      </h1>

      {/* ❌ EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-4 text-lg">
            No bookings yet 😢
          </p>

          <a
            href="/"
            className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            Explore Places
          </a>
        </div>
      ) : (
        <div className="grid gap-6">

          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-5 flex flex-col md:flex-row gap-5 hover:scale-[1.02] transition"
            >

              {/* 📸 IMAGE */}
              <img
                src={
                  b.place?.images?.[0] ||
                  "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                }
                alt="place"
                className="w-full md:w-52 h-40 object-cover rounded-xl"
              />

              {/* 📄 DETAILS */}
              <div className="flex-1">

                <h2 className="text-xl font-semibold">
                  {b.place?.title || "No Title"}
                </h2>

                <p className="text-gray-400">
                  📍 {b.place?.location || "Unknown location"}
                </p>

                <p className="mt-2 text-sm">
                  📅 {new Date(b.date).toLocaleDateString("en-IN")}
                </p>

                <p className="text-sm">
                  👥 {b.guests} Guests
                </p>

                <p className="mt-2 text-green-400 font-bold text-lg">
                  ₹ {b.totalPrice}
                </p>

                {/* 🔥 Booking ID */}
                <p className="text-xs text-gray-500 mt-2">
                  Booking ID: {b._id.slice(-6).toUpperCase()}
                </p>
              </div>

              {/* ⚡ STATUS + ACTION */}
              <div className="flex flex-col justify-between items-end">

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    b.status === "confirmed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {b.status}
                </span>

                {/* CANCEL BUTTON */}
                {b.status === "confirmed" && (
                  <button
                    onClick={() => cancelBooking(b._id)}
                    disabled={cancelLoading === b._id}
                    className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition flex items-center gap-2 disabled:opacity-70"
                  >
                    {cancelLoading === b._id ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      "Cancel Booking"
                    )}
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}