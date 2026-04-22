import { useEffect, useState } from "react";
import API from "@/react-app/api";

import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import Hero from "@/react-app/components/home/Hero";
import FeaturedDestinations from "@/react-app/components/home/FeaturedDestinations";
import Categories from "@/react-app/components/home/Categories";
import Testimonials from "@/react-app/components/home/Testimonials";
import CallToAction from "@/react-app/components/home/CallToAction";
import DestinationsGrid from "@/react-app/components/DestinationsGrid";
import MapExplorer from "@/react-app/components/MapExplorer";

interface Place {
  _id?: string;
  name: string;
  location: string;
  images?: string[];
  category?: string;
  difficulty?: string;
}

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/places")
      .then((res) => {
        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching places:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      <main className="space-y-16">

        {/* HERO */}
        <section>
          <Hero />
        </section>

        {/* FEATURED */}
        <section className="px-6 md:px-16">
          <h2 className="text-2xl font-bold mb-6">
            🌟 Featured Destinations
          </h2>
          <FeaturedDestinations />
        </section>

        {/* DESTINATIONS GRID */}
        <section className="px-6 md:px-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Explore Places
            </h2>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : places.length > 0 ? (
            <DestinationsGrid places={places} />
          ) : (
            <p className="text-gray-500 text-center">
              No places found.
            </p>
          )}
        </section>

        {/* MAP */}
        <section className="px-6 md:px-16">
          <h2 className="text-2xl font-bold mb-6">
            🗺️ Explore on Map
          </h2>
          <MapExplorer />
        </section>

        {/* CATEGORIES */}
        <section className="px-6 md:px-16">
          <h2 className="text-2xl font-bold mb-6">
            Categories
          </h2>
          <Categories />
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-white py-12 px-6 md:px-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            What Travelers Say 💬
          </h2>
          <Testimonials />
        </section>

        {/* CTA */}
        <section className="px-6 md:px-16">
          <CallToAction />
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}