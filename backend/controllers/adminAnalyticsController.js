const User = require("../models/user");
const Booking = require("../models/Booking");
const Place = require("../models/place");

// 🔥 YOUR ANALYTICS FUNCTION (unchanged)
const getAnalytics = async (req, res) => {
  try {
    console.log("📊 Analytics called");
    
    const [totalUsers, totalBookings, totalPlaces, revenueResult, bookingStats] =
      await Promise.all([
        User.countDocuments().catch(() => 0),
        Booking.countDocuments(),
        Place.countDocuments().catch(() => 0),
        Booking.aggregate([
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]).catch(() => []),
        Booking.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ]).catch(() => [])
      ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      success: true,
      data: {
        users: totalUsers,
        bookings: totalBookings,
        places: totalPlaces,
        revenue: totalRevenue,
        statusStats: bookingStats
      }
    });

    console.log("✅ Analytics response:", totalBookings, "bookings");

  } catch (error) {
    console.error("❌ Analytics Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Analytics error",
      data: { users: 0, bookings: 0, places: 0, revenue: 0 }
    });
  }
};

// 🔥 CRITICAL: PROPER EXPORT
exports.getAnalytics = getAnalytics;
module.exports = { getAnalytics };  // Both exports for safety

console.log("✅ adminAnalyticsController loaded - getAnalytics exported");