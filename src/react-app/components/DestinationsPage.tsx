import { useEffect, useState } from "react";
import DestinationsGrid from "./DestinationsGrid";

interface Place {
  _id?: string;
  name: string;
  location: string;
  images?: string[];
  category?: string;
  difficulty?: string;
}

export default function DestinationsPage() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/places")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched places:", data);
        setPlaces(data);
      })
      .catch((err) => console.error("Failed to fetch places:", err));
  }, []);

  return <DestinationsGrid places={places} />;
}