const Booking = require("../models/Booking");

// 🔥 GET ALL BOOKINGS (ADMIN)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "email")
      .populate("place", "name");

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Booking fetch error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};