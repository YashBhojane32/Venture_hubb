interface Place {
  _id?: string;
  name: string;
  location: string;
  images?: string[];
  category?: string;
  difficulty?: string;
}

export default function DestinationCard({ destination }: { destination: Place }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={destination.images && destination.images.length > 0 ? destination.images[0] : "https://via.placeholder.com/400"}
          alt={destination.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{destination.name}</h3>
        <p className="text-gray-500 text-sm mt-1">📍 {destination.location}</p>

        {/* Tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {destination.category && (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full">{destination.category}</span>
          )}
          {destination.difficulty && (
            <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-full">{destination.difficulty}</span>
          )}
        </div>
      </div>
    </div>
  );
}