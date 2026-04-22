import DestinationCard from "./DestinationCard";

interface Place {
  _id?: string;
  name: string;
  location: string;
  images?: string[];
  category?: string;
  difficulty?: string;
}

interface Props {
  places: Place[];
}

export default function DestinationsGrid({ places }: Props) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        🌄 Hidden Gems of Maharashtra
      </h2>

      {places.length === 0 ? (
        <p className="text-center text-gray-500">No places found</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {places.map((place) => (
            <DestinationCard key={place._id || place.name} destination={place} />
          ))}
        </div>
      )}
    </section>
  );
}