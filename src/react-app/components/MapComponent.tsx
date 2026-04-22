import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ places }) => {
  return (
    <MapContainer
      center={[19.7515, 75.7139]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place, index) => (
        <Marker key={index} position={[place.lat, place.lng]}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;