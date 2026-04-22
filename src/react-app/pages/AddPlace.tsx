import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function AddPlace() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      navigate("/login");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    difficulty: "",
    price: "",
    guideAvailable: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ IMPORTANT
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      alert("✅ Place Added Successfully 🚀");
      navigate("/destinations");

    } catch (error: any) {
      console.error(error);
      alert(error.message || "❌ Error adding place");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Add New Place 🏔️
          </h2>
          <p className="text-gray-500">
            Share a hidden gem with travelers
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Place Name
            </label>
            <input
              name="name"
              placeholder="e.g. Rajmachi Fort"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>

          {/* LOCATION */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              name="location"
              placeholder="e.g. Lonavala, Maharashtra"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="fort">Fort</option>
              <option value="waterfall">Waterfall</option>
              <option value="trek">Trek</option>
              <option value="beach">Beach</option>
              <option value="temple">Temple</option>
            </select>
          </div>

          {/* DIFFICULTY */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Difficulty
            </label>
            <select
              name="difficulty"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              placeholder="2499"
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* GUIDE */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              name="guideAvailable"
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-gray-600">
              Guide Available
            </label>
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the place..."
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* SUBMIT */}
          <div className="col-span-2">
            <button className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition">
              🚀 Add Place
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}