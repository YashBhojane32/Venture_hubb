import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/places/${id}`);
        const data = await res.json();
        setPlace(data);
      } catch (error) {
        console.error("Error fetching place:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!place) {
    return <div className="text-center mt-20">Place not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* HERO IMAGE */}
      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={place.images?.[0]?.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg -mt-16 rounded-xl relative z-10">

        <h1 className="text-3xl font-bold">{place.name}</h1>
        <p className="text-gray-500 mt-1">📍 {place.location}</p>

        <div className="flex gap-3 mt-3">
          <span className="bg-gray-200 px-3 py-1 rounded">
            {place.category}
          </span>
          <span className="bg-green-100 px-3 py-1 rounded">
            {place.difficulty}
          </span>
          <span className="bg-yellow-100 px-3 py-1 rounded">
            ⭐ {place.rating}
          </span>
        </div>

        <p className="mt-6 text-gray-700">{place.description}</p>

        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-600">
            ₹{place.price}
          </h2>

          <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Book Now 🚀
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}