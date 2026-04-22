import { useEffect, useState } from "react";
import axios from "axios";

export default function GuideApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApps = async () => {
    const res = await axios.get("http://localhost:5000/api/applications");
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/applications/${id}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchApps();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Guide Applications</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{app.name}</h2>
            <p className="text-gray-600">{app.email}</p>
            <p className="text-gray-500">{app.city}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white ${
                app.status === "Approved"
                  ? "bg-green-500"
                  : app.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {app.status}
            </span>

            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => updateStatus(app._id, "Approved")}
              >
                Approve
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => updateStatus(app._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}