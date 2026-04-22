import { useState } from "react";

export default function ItineraryPlanner() {
  const [days, setDays] = useState(1);
  const [people, setPeople] = useState(1);

  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        Plan Your Trip
      </h2>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <label className="block mb-3">Number of Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-3">Number of Travelers</label>
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Generate Itinerary
        </button>
      </div>
    </section>
  );
}