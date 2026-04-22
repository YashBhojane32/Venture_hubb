import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-28 px-6 md:px-16 text-center overflow-hidden">
        
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')] bg-cover bg-center"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Beyond the Map 🌍
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8">
            Venture Hub is your gateway to hidden travel experiences —
            from untouched forts to secret waterfalls across Maharashtra.
          </p>

          <button
            onClick={() => navigate("/destinations")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
            className="rounded-2xl shadow-xl group-hover:scale-105 transition"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Venture Hub? 🚀
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Most travel platforms show you the same crowded destinations.
            We do the opposite.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Venture Hub focuses on hidden gems — places that are raw,
            untouched, and full of real adventure.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We connect explorers with authentic experiences powered by
            local guides and real insights.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Makes Us Different?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-3">
              🧭 Hidden Destinations
            </h3>
            <p className="text-gray-600">
              Explore places that are not yet discovered by mass tourism.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Smart Planning
            </h3>
            <p className="text-gray-600">
              Filter trips based on difficulty, price, and preferences.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-3">
              🤝 Local Connection
            </h3>
            <p className="text-gray-600">
              Connect with local guides and authentic travel experiences.
            </p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 md:px-16 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-12">
          Our Journey So Far 📊
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-indigo-600">50+</h3>
            <p className="text-gray-600">Destinations</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-indigo-600">10K+</h3>
            <p className="text-gray-600">Travelers</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-indigo-600">20+</h3>
            <p className="text-gray-600">Treks</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-3xl font-bold text-indigo-600">100+</h3>
            <p className="text-gray-600">Experiences</p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 md:px-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Your Next Adventure Starts Here ✈️
        </h2>

        <p className="mb-8 text-white/90">
          Don’t just travel. Explore something unforgettable.
        </p>

        <button
          onClick={() => navigate("/destinations")}
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Explore Now
        </button>

      </section>

      <Footer />
    </div>
  );
}