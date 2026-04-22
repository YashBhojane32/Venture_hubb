import { useEffect, useState } from "react";

export default function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ IMPORTANT
        },
      });

      const data = await res.json();
      setApps(data.data || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleApprove = async (id: string) => {
    await fetch(`http://localhost:5000/api/applications/${id}/approve`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchApps();
  };

  const handleReject = async (id: string) => {
    await fetch(`http://localhost:5000/api/applications/${id}/reject`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchApps();
  };

  const getStatusStyle = (status: string) => {
    if (status === "approved")
      return "bg-green-100 text-green-600";
    if (status === "pending")
      return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  // 📊 Stats
  const total = apps.length;
  const approved = apps.filter(a => a.status === "approved").length;
  const pending = apps.filter(a => a.status === "pending").length;
  const rejected = apps.filter(a => a.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">
        Admin Dashboard 📊
      </h2>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total</p>
          <h3 className="text-2xl font-bold">{total}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Approved</p>
          <h3 className="text-2xl font-bold text-green-600">{approved}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-600">{pending}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Rejected</p>
          <h3 className="text-2xl font-bold text-red-600">{rejected}</h3>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : apps.length === 0 ? (
        <p className="text-gray-500">No applications found</p>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between gap-4"
            >

              {/* LEFT */}
              <div>
                <h3 className="text-lg font-semibold">
                  {app.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {app.email} • {app.phone}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  📍 {app.location}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize">
                    {app.role}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {app.experience}
                </p>
              </div>

              {/* RIGHT */}
              {app.status === "pending" && (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() => handleReject(app._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}