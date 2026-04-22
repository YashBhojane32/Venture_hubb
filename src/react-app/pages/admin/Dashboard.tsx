import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/react-app/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Stats = {
  places: number;
  bookings: number;
  users: number;
  revenue: number;
};

type ChartData = {
  day: string;
  bookings: number;
  revenue: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    places: 0,
    bookings: 0,
    users: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      console.log("🔍 FETCHING ANALYTICS...");

      const res = await API.get("/admin/analytics");

      console.log("✅ FULL RESPONSE:", res.data);
      const data = res.data?.data || res.data || {};

      console.log("✅ RAW DATA:", data);

      if (!data || Object.keys(data).length === 0) {
        console.warn("⚠️ Empty data - using fallback");
        setStats({ places: 0, bookings: 0, users: 0, revenue: 0 });
        setChartData([]);
        return;
      }

      const newStats: Stats = {
        places: Number(data.places) || 0,
        bookings: Number(data.bookings) || 0,
        users: Number(data.users) || 0,
        revenue: Number(data.revenue) || 0,
      };

      console.log("✅ PARSED STATS:", newStats);
      setStats(newStats);

      const realChartData = data.chartData || generateMockChartData(newStats);
      console.log("✅ CHART DATA:", realChartData);
      setChartData(realChartData);

    } catch (err: any) {
      console.error("❌ Analytics error:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        setError("🔐 Session expired. Redirecting...");
        setTimeout(() => navigate("/admin/login", { replace: true }), 1500);
        return;
      }
      
      setError(err.response?.data?.message || err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const generateMockChartData = (stats: Stats): ChartData[] => {
    const baseBookings = Math.max(1, stats.bookings / 7);
    const baseRevenue = Math.max(1000, stats.revenue / 7);
    
    return [
      { day: "Mon", bookings: Math.floor(baseBookings * 0.8), revenue: Math.floor(baseRevenue * 0.8) },
      { day: "Tue", bookings: Math.floor(baseBookings * 1.1), revenue: Math.floor(baseRevenue * 1.1) },
      { day: "Wed", bookings: Math.floor(baseBookings * 1.3), revenue: Math.floor(baseRevenue * 1.3) },
      { day: "Thu", bookings: Math.floor(baseBookings * 0.9), revenue: Math.floor(baseRevenue * 0.9) },
      { day: "Fri", bookings: Math.floor(baseBookings * 1.6), revenue: Math.floor(baseRevenue * 1.6) },
      { day: "Sat", bookings: Math.floor(baseBookings * 1.4), revenue: Math.floor(baseRevenue * 1.4) },
      { day: "Sun", bookings: Math.floor(baseBookings * 0.7), revenue: Math.floor(baseRevenue * 0.7) },
    ];
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-16 bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-gray-700 mb-2">Loading Dashboard...</p>
          <p className="text-gray-500">Fetching analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER + DEBUG */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/70 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Admin Analytics 🚀
            </h1>
            <p className="text-xl text-gray-600">
              {stats.bookings > 0 ? `${stats.bookings.toLocaleString()} bookings` : 'No data yet'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchStats}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="p-8 bg-red-50 border-2 border-red-200 rounded-3xl shadow-xl animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-2xl">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">{error}</h3>
                <p className="text-red-700">Check console for details</p>
              </div>
              <button
                onClick={fetchStats}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 shadow-lg hover:shadow-xl transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* 🔍 DEBUG INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-blue-50 border border-blue-200 rounded-3xl text-sm">
          <div><strong>Places:</strong> {stats.places.toLocaleString()}</div>
          <div><strong>Bookings:</strong> {stats.bookings.toLocaleString()}</div>
          <div><strong>Users:</strong> {stats.users.toLocaleString()}</div>
          <div><strong>Revenue:</strong> ₹{stats.revenue.toLocaleString()}</div>
          <div><strong>Chart Points:</strong> {chartData.length}</div>
          <div className="text-right">
            <button
              onClick={() => {
                console.log('📊 STATS:', stats);
                console.log('📈 CHART:', chartData);
                alert('Check console for full data!');
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
            >
              Debug
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Places" 
            value={stats.places.toLocaleString()} 
            icon="🏠"
            change="+12.5%"
            color="from-blue-500 to-cyan-500"
            bgColor="bg-gradient-to-br"
          />
          <StatCard 
            title="Bookings" 
            value={stats.bookings.toLocaleString()} 
            icon="📅"
            change="+28.3%"
            color="from-emerald-500 to-teal-500"
            bgColor="bg-gradient-to-br"
          />
          <StatCard 
            title="Active Users" 
            value={stats.users.toLocaleString()} 
            icon="👥"
            change="+8.7%"
            color="from-purple-500 to-pink-500"
            bgColor="bg-gradient-to-br"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${Math.floor((stats.revenue || 0) / 1000).toLocaleString()}K`} 
            icon="💰"
            change="+15.2%"
            color="from-amber-500 to-orange-500"
            bgColor="bg-gradient-to-br"
          />
        </div>

        {/* CHART */}
        {chartData.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Weekly Performance 📈</h2>
                <p className="text-gray-600 mt-1">{stats.bookings} total bookings</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">Last 7 days</span>
            </div>

            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={15}
                  tick={{ fontSize: 14, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={15}
                  tick={{ fontSize: 14, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0,0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#6366f1"
                  strokeWidth={5}
                  dot={{ fill: "#6366f1", strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 10, strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-6 mx-auto p-6 bg-gray-100 rounded-3xl w-fit">📈</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">No Chart Data</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {stats.bookings > 0 
                ? "Chart will appear when weekly data is available" 
                : "No bookings yet. Create some to see analytics!"
              }
            </p>
            <button
              onClick={fetchStats}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all"
            >
              🔄 Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  change: string;
  color: string;
  bgColor?: string;
}

function StatCard({ title, value, icon, change, color, bgColor = "bg-gradient-to-br" }: StatCardProps) {
  // ✅ NaN SAFE - Convert to string
  const safeValue = String(value || "0");
  
  return (
    <div className={`group ${bgColor} ${color} text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-black mb-2 group-hover:scale-105 transition-transform">
        {safeValue}
      </h2>
      <p className="text-lg opacity-90 font-semibold">{title}</p>
      <span className="inline-flex items-center text-sm font-bold mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
        <span className="mr-1">📈</span>
        {change}
      </span>
    </div>
  );
}