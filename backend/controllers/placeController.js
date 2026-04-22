const Place = require("../models/place");

// ✅ Create Place (Admin)
exports.createPlace = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      category,
      difficulty,
      price,
      images,
      guideAvailable,
      coordinates
    } = req.body;

    const place = new Place({
      name,
      location,
      description,
      category,
      difficulty,
      price,
      images,
      guideAvailable,
      coordinates,
      createdBy: req.user.id // from auth middleware
    });

    await place.save();

    res.status(201).json({
      message: "Place created successfully",
      data: place
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating place",
      error: error.message
    });
  }
};



// ✅ Get All Places (Public)
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: places.length,
      data: places
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching places",
      error: error.message
    });
  }
};



// ✅ Get Single Place
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    res.status(200).json(place);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching place",
      error: error.message
    });
  }
};



// ✅ Update Place (Admin)
exports.updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    res.status(200).json({
      message: "Place updated successfully",
      data: updatedPlace
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating place",
      error: error.message
    });
  }
};



// ✅ Delete Place (Admin)
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({
        message: "Place not found"
      });
    }

    res.status(200).json({
      message: "Place deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting place",
      error: error.message
    });
  }
};