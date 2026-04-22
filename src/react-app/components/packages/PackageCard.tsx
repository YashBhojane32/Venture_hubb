import { Star, MapPin, Clock } from "lucide-react";

export default function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={pkg.image}
        alt={pkg.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {pkg.location}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          {pkg.duration}
        </div>

        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="ml-1">{pkg.rating}</span>
        </div>

        <ul className="text-sm text-gray-600 mb-4">
          {pkg.highlights.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">₹{pkg.price}</span>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}