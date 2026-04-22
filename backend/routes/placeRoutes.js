const express = require("express");
const router = express.Router();
const Place = require("../models/place");
const upload = require("../middleware/upload");

// 👉 POST - Add new place with MULTIPLE IMAGES
router.post("/", async (req, res) => {
  try {
    const placeName = req.body.name;

    // ✅ AUTO IMAGE FROM UNSPLASH
    const autoImage = `https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80`;

    const newPlace = new Place({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      category: req.body.category,
      difficulty: req.body.difficulty,
      price: req.body.price,
      rating: req.body.rating || 4,

      // ✅ SET AUTO IMAGE
      images: [
        {
          image: autoImage,
        },
      ],

      guideAvailable: req.body.guideAvailable,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 GET all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 GET single place
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

// 👉 UPDATE place
router.put("/:id", async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 👉 DELETE place
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;