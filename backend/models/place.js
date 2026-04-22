const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  category: {
    type: String,
    enum: ["fort", "waterfall", "trek", "beach", "temple"],
    required: true
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"]
  },

  price: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 4.0
  },

  images: [String], // ✅ fixed

  guideAvailable: {
    type: Boolean,
    default: false
  },

  coordinates: {
    lat: Number,
    lng: Number
  },

  createdBy: {
    type: String
  }

}, { timestamps: true });

module.exports =
  mongoose.models.Place || mongoose.model("Place", placeSchema);