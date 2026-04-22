const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Place = require("../models/place");

const { protect, adminOnly } = require("../middleware/authMiddleware");


// 📌 CREATE BOOKING (USER ONLY)
router.post("/", protect, async (req, res) => {
  try {
    const { place, date, guests } = req.body;

    if (!place || !date || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const placeData = await Place.findById(place);

    if (!placeData) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    const totalPrice = placeData.price * guests;

    const booking = await Booking.create({
      user: req.user._id, // 🔐 from token
      place,
      date,
      guests,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    console.error("❌ Create Booking Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// 📌 GET MY BOOKINGS (USER)
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("place")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    console.error("❌ Fetch My Bookings:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// 📌 ADMIN: GET ALL BOOKINGS
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("place")
      .populate("user")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    console.error("❌ Fetch All Bookings:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// 📌 CANCEL BOOKING
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 🔐 Only owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
    });

  } catch (error) {
    console.error("❌ Cancel Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;