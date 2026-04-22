import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { destinations } from "@/data/destinations";

// ✅ Type
type Destination = {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export default function MapExplorer() {
  const typedDestinations: Destination[] = destinations;

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Explore Destinations on Map
      </h2>

      <MapContainer
        center={[19.7515, 75.7139]}
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-xl shadow-lg"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {typedDestinations.map((place: Destination) => (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lng]}
          >
            <Popup>
              <h3 className="font-bold">{place.name}</h3>
              <p>{place.location}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}