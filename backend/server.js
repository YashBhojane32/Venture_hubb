require("dotenv").config({ path: __dirname + "/.env" });
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const adminAuth = require("./routes/adminAuth");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const placeRoutes = require("./routes/placeRoutes");

const app = express();

// 🔥 CLEAR CACHE
delete require.cache[require.resolve("./routes/adminRoutes")];
console.log("🔄 Routes reloaded:", {
  adminRoutes: typeof adminRoutes,
  bookingRoutes: typeof bookingRoutes
});

// ✅ FIXED CORS - Copy this exactly
app.use(cors({
  origin: true,  // ✅ Allows ALL localhost origins (DEVELOPMENT)
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 ROUTES
app.use("/api/admin", adminRoutes);
console.log("✅ /api/admin MOUNTED - Analytics available");

app.use("/api/places", placeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin/auth", adminAuth);
app.use("/api/bookings", bookingRoutes);

// 🧪 TEST
app.get("/api/admin/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "API working!",
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => res.send("🚀 Venture Hub API"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(`✅ Admin: http://localhost:${PORT}/api/admin/test`);
      console.log(`✅ Analytics: http://localhost:${PORT}/api/admin/analytics`);
    });
  })
  .catch(err => console.error("❌ MongoDB:", err));