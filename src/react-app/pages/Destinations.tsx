import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import { categories, type Category } from "@/data/destinations";

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // ✅ API DATA
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
useEffect(() => {
  const fetchPlaces = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/places");
      const data = await res.json();

      console.log("API DATA:", data);

      if (Array.isArray(data)) {
        setPlaces(data);
      } else {
        console.error("API returned wrong format:", data);
        setPlaces([]);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPlaces();
}, []);

  // 🔍 FILTER LOGIC
  const filteredDestinations = useMemo(() => {
    return places.filter((dest) => {
      const matchesSearch =
        dest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || dest.category === selectedCategory;
      const matchesDifficulty = !selectedDifficulty || dest.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, places]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || selectedDifficulty || searchQuery;

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading places...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-28 pb-16 text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-blue-600 opacity-90" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">Explore Destinations 🌍</h1>
          <p className="mt-2">Discover 1000+ hidden places 🔥</p>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-6 px-4 py-3 rounded-xl w-full max-w-xl text-black"
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-3 mb-6">

          {/* CATEGORY */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : (cat.id as Category))
              }
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}

          {/* DIFFICULTY */}
          {["Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              onClick={() =>
                setSelectedDifficulty(selectedDifficulty === diff ? null : diff)
              }
              className={`px-4 py-2 rounded-full text-sm ${
                selectedDifficulty === diff
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {diff}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-red-500"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* GRID */}
        {filteredDestinations.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredDestinations.map((destination) => (
              <Link
                key={destination._id}
                to={`/destinations/${destination._id}`}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={
                      destination.images?.[0]?.image ||
                      "https://via.placeholder.com/400"
                    }
                    alt={destination.name}
                    className="h-52 w-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                  <p className="text-sm text-gray-500">
                    📍 {destination.location}
                  </p>

                  <p className="text-sm mt-2 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {destination.category}
                    </span>

                    <span className="text-xs bg-green-100 px-2 py-1 rounded">
                      {destination.difficulty || "N/A"}
                    </span>
                  </div>

                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    View Details →
                  </button>
                </div>
              </Link>
            ))}

          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No places found 😔
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}