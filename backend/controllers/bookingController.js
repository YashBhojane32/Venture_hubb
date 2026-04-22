const Booking = require("../models/Booking");
const Place = require("../models/Place");

// 📌 CREATE BOOKING (SECURE)
exports.createBooking = async (req, res) => {
  try {
    const { place, date, guests } = req.body;

    // ❌ Validate input
    if (!place || !date || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Get place price
    const placeData = await Place.findById(place);

    if (!placeData) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    // 💰 Calculate price
    const totalPrice = placeData.price * guests;

    // ✅ Create booking securely
    const booking = await Booking.create({
      user: req.user._id, // 🔐 from token
      place,
      date,
      guests,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });

  } catch (err) {
    console.error("❌ Create Booking Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 📌 GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("place")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (err) {
    console.error("❌ Fetch Bookings Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 📌 CANCEL BOOKING (NEW 🔥)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ❌ Only owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
    });

  } catch (err) {
    console.error("❌ Cancel Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔥 ADMIN FUNCTIONS (NEW)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('place', 'name location')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error("❌ Admin Get Bookings Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log(`🔄 Admin updating booking ${id} to ${status}`);
    
    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be: confirmed, cancelled, or pending',
      });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('user', 'name email')
    .populate('place', 'name location');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Status updated successfully!',
      data: booking,
    });
  } catch (err) {
    console.error("❌ Admin Update Status Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};