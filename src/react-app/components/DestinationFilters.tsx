import { useState } from "react";
import { destinations } from "@/data/destinations";

export default function DestinationFilters() {
  const [difficulty, setDifficulty] = useState("");
  const [location, setLocation] = useState("");

  const filtered = destinations.filter((d) => {
    return (
      (difficulty === "" || d.difficulty === difficulty) &&
      (location === "" || d.location.includes(location))
    );
  });

  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Search Destinations</h2>

      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>

        <input
          type="text"
          placeholder="Search location"
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((place) => (
          <div key={place.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{place.name}</h3>
            <p>{place.location}</p>
            <p>{place.difficulty}</p>
          </div>
        ))}
      </div>
    </section>
  );
}