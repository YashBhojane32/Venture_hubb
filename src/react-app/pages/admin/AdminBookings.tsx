import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Search, RefreshCw, AlertCircle } from "lucide-react";

type Booking = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  place: {
    name: string;
    location: string;
  };
  date: string;
  guests: number;
  totalPrice: number;
  status: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // 🔑 Get token with fallback and validation
  const getToken = useCallback((): string | null => {
    const adminToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");
    
    if (adminToken) return adminToken;
    if (userToken) return userToken;
    
    return null;
  }, []);

  // 🔍 Enhanced fetch with comprehensive error handling
  const fetchBookings = useCallback(async (): Promise<void> => {
    const token = getToken();
    if (!token) {
      setError("❌ No admin token found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRefreshing(true);

      console.log("🔑 Fetching bookings with token:", token.slice(0, 20) + "...");

      const response = await axios.get<ApiResponse<Booking[]>>(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );

      console.log("✅ API Response:", response.data);
      
      const bookingsData = response.data.data || response.data || [];
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("🔐 Unauthorized! Redirecting to login...");
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminToken");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 1500);
        return;
      }
      
      if (err.code === "ECONNABORTED") {
        setError("⏰ Request timeout. Server might be slow.");
      } else if (err.response?.data?.message) {
        setError(`❌ ${err.response.data.message}`);
      } else {
        setError(`❌ Failed to fetch bookings: ${err.message}`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getToken]);

  // 🔄 Auto refresh every 30s + initial load
  useEffect(() => {
    fetchBookings();
    
    const interval = setInterval(() => {
      if (!loading && !refreshing) {
        fetchBookings();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchBookings, loading, refreshing]);

  // 🔍 Search filter
  const filteredBookings = bookings.filter((booking) =>
    booking.place?.name?.toLowerCase().includes(search.toLowerCase()) ||
    booking.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    booking.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 Update booking status
  const updateStatus = useCallback(async (id: string, status: string) => {
    const token = getToken();
    if (!token) {
      setError("❌ No token available");
      return;
    }

    try {
      setError("");
      
      await axios.put(
        `http://localhost:5000/api/admin/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      // Optimistically update UI
      setBookings(prev =>
        prev.map(booking =>
          booking._id === id ? { ...booking, status } : booking
        )
      );

      console.log(`✅ Status updated to: ${status}`);
    } catch (err: any) {
      console.error("❌ Status update failed:", err);
      
      if (err.response?.status === 401) {
        setError("🔐 Session expired!");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      } else {
        alert(`Status update failed: ${err.response?.data?.message || err.message}`);
        // Revert optimistic update on error
        fetchBookings();
      }
    }
  }, [getToken, fetchBookings]);

  // 🔄 Manual refresh
  const handleRefresh = () => {
    fetchBookings();
  };

  // 🧹 Clear error
  const clearError = () => {
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Booking Management 💼
            </h1>
            <p className="text-gray-600 text-lg">
              {loading 
                ? "Loading bookings..." 
                : `${filteredBookings.length} of ${bookings.length} bookings found`
              }
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
              <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
            </button>

            <div className="flex items-center w-full sm:w-80 border-2 border-gray-200 bg-white px-4 py-3 rounded-2xl shadow-sm focus-within:border-blue-300 transition-all">
              <Search size={20} className="text-gray-400 flex-shrink-0" />
              <input
                placeholder="Search by place, user name or email..."
                className="ml-3 outline-none w-full text-sm placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle size={24} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-900 font-semibold text-lg">{error}</p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={clearError}
                  className="p-2 hover:bg-red-100 rounded-xl transition"
                >
                  ✕
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition"
                >
                  Clear & Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 bg-white/50 backdrop-blur-sm rounded-3xl p-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-gray-600 font-medium">Loading bookings...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-7xl mx-auto mb-6 p-4 bg-gray-100 rounded-3xl w-fit">📭</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {search ? "No matching bookings" : "No bookings yet"}
            </h3>
            <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
              {search 
                ? "Try different keywords or clear the search" 
                : "No bookings available. Refresh to check again."
              }
            </p>
            <button
              onClick={handleRefresh}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              🔄 Refresh Bookings
            </button>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 via-white to-gray-50/50">
                  <tr>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Place
                    </th>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      User
                    </th>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Date
                    </th>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Guests
                    </th>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Total
                    </th>
                    <th className="p-6 text-left font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Status
                    </th>
                    <th className="p-6 text-right font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t border-gray-100/50 hover:bg-white/50 transition-all duration-200 group"
                    >
                      <td className="p-6">
                        <div className="font-semibold text-gray-900 text-lg">
                          {booking.place?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                          {booking.place?.location || "No location"}
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="font-semibold text-gray-900">
                          {booking.user?.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-sm">
                          {booking.user?.email || "No email"}
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="text-gray-900 font-medium">
                          {booking.date 
                            ? new Date(booking.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })
                            : "N/A"
                          }
                        </div>
                      </td>

                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full shadow-sm">
                          {booking.guests || 0}
                        </span>
                      </td>

                      <td className="p-6">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                          ₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")}
                        </span>
                      </td>

                      <td className="p-6">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm border transition-all ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
                          }`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </td>

                      <td className="p-6 pr-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateStatus(booking._id, "confirmed")}
                            disabled={booking.status === "confirmed"}
                            className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 hover:shadow-md flex-1"
                          >
                            ✅ Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(booking._id, "cancelled")}
                            disabled={booking.status === "cancelled"}
                            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 hover:shadow-md flex-1"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}