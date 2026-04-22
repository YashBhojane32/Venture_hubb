import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import BookingForm from "@/react-app/components/BookingForm";
import { Skeleton } from "@/react-app/components/ui/skeleton"; // Optional: npm i @radix-ui/react-skeleton

export default function DestinationDetails() {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("overview");

  // ✅ FIXED: Robust API call + error handling
  const fetchPlace = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch(`http://localhost:5000/api/places/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("✅ PLACE DATA:", data);
      setPlace(data);
    } catch (err: any) {
      console.error("🚨 Fetch error:", err);
      setError(err.message || "Failed to load destination");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  // ✅ LOADING SKELETON (Much better UX)
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="mt-32 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-48 mx-auto mb-8" />
          <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error || !place) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-12 max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Destination Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error || "Place doesn't exist."}</p>
          <button
            onClick={fetchPlace}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // 🔥 UNIVERSAL IMAGE FIX (Enhanced)
  const imageUrl =
    place?.images?.[0]?.image ||
    place?.images?.[0]?.url ||
    place?.image ||
    place?.images?.[0] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[500px]">
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";
            target.className += " brightness-75"; // Visual feedback
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {place.name}
          </h1>
          <p className="text-lg opacity-90">📍 {place.location}</p>
          <p className="text-sm opacity-75 mt-1">
            {place.category} • {place.price}₹/person
          </p>
        </div>
      </div>

      {/* 🔥 HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b bg-white/80 backdrop-blur-sm">
        <nav className="text-sm text-gray-500 mb-4">
          <span>Home</span> / <span>Destinations</span> /{" "}
          <span className="font-semibold text-gray-900">{place.name}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">{place.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>📍 {place.location}</span>
              <span>•</span>
              <span>{place.category}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">
              ₹{place.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>
      </div>

      {/* 🔥 TABS */}
      <div className="max-w-7xl mx-auto px-6 bg-white/50 backdrop-blur-sm border-b sticky top-[70px] z-10">
        <div className="flex gap-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "itinerary", label: "Itinerary" },
            { id: "reviews", label: "Reviews" },
          ].map(({ id: t, label }) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-4 capitalize font-medium transition-all duration-200 ${
                tab === t
                  ? "border-b-2 border-orange-500 text-orange-500 shadow-sm bg-white/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/25"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-3 gap-12 lg:gap-16">
        {/* LEFT CONTENT */}
        <article className="lg:col-span-2 space-y-12 prose prose-gray max-w-none">
          
          {/* OVERVIEW */}
          {tab === "overview" && (
            <>
              <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  🌟 Tour Description
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {place.description || (
                    <p className="text-gray-500 italic">
                      No description available. An unforgettable adventure awaits!
                    </p>
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 text-gray-900">📋 Tour Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">1 Day</div>
                    <div className="text-sm text-gray-600 mt-1">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{place.category}</div>
                    <div className="text-sm text-gray-600 mt-1">Category</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">10</div>
                    <div className="text-sm text-gray-600 mt-1">Group Size</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {place.difficulty || "Easy"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Difficulty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">
                      ₹{place.price}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Price</div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ITINERARY */}
          {tab === "itinerary" && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">🗺️ Itinerary</h2>
              <div className="space-y-6">
                <div className="group border-l-4 border-orange-500 pl-6 bg-gradient-to-r from-orange-50/50 to-transparent p-6 rounded-r-2xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Day 1</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Embark on your adventure to {place.name}, explore hidden gems, 
                    discover local secrets, and create memories that last a lifetime.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* REVIEWS */}
          {tab === "reviews" && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">⭐ Reviews</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                    <span className="font-semibold text-gray-900">Rahul K.</span>
                  </div>
                  <p className="text-gray-700">
                    "Unbelievable experience! The guides were amazing and the views were breathtaking. 
                    Highly recommend for anyone seeking adventure!"
                  </p>
                </div>
                <div className="text-center py-12 text-gray-500">
                  💬 Be the first to review this adventure!
                </div>
              </div>
            </section>
          )}
        </article>

        {/* 🔥 STICKY BOOKING CARD */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl shadow-orange-100/50">
            <div className="text-center mb-6">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                ₹{place.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-medium">per person</div>
            </div>

            <BookingForm
              placeId={place._id || id!}
              placeName={place.name}
              price={Number(place.price)}
              image={imageUrl}
            />
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}