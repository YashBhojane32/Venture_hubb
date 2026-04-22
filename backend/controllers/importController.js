const axios = require("axios");
const Place = require("../models/place");

const fetchPlacesFromOSM = async (req, res) => {
  try {
    const query = `
      [out:json];
      area["name"="Maharashtra"]->.searchArea;
      (
        node["tourism"](area.searchArea);
      );
      out;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: { "Content-Type": "text/plain" },
      }
    );

    const places = response.data.elements
      .filter((el) => el.tags && el.tags.name)
      .map((el) => ({
        name: el.tags.name,
        location: "Maharashtra",

        description: el.tags.tourism || "Popular tourist place",

        // ✅ SAFE VALUES (no enum errors)
        category: getCategory(el.tags) || "temple",
        difficulty: "Easy",

        price: 0,
        rating: 4.0,

        images: [],

        guideAvailable: false,
      }));

    let savedCount = 0;

    for (const place of places) {
      try {
        const exists = await Place.findOne({ name: place.name });

        if (!exists) {
          await Place.create(place);
          savedCount++;
        }
      } catch (err) {
        console.log("Save Error:", place.name, err.message);
      }
    }

    res.json({
      message: "Places imported successfully",
      totalFetched: places.length,
      savedToDB: savedCount,
    });

  } catch (error) {
    console.error("IMPORT ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ FIXED CATEGORY MAPPER
function getCategory(tags) {
  if (tags.tourism === "attraction") return "fort";
  if (tags.natural === "waterfall") return "waterfall";
  if (tags.leisure === "park") return "trek";
  if (tags.tourism === "museum") return "temple";

  return "temple"; // fallback
}

module.exports = { fetchPlacesFromOSM };