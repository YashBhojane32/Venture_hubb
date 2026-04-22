require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const adminAuth = require("./routes/adminAuth");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const placeRoutes = require("./routes/placeRoutes");

const app = express();

// ✅ CORS (ONLY ONCE)
app.use(cors({
  origin: "*", // change after deployment
  credentials: true
}));

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));

// ✅ Static folder (ONLY ONCE)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 ROUTES
app.use("/api/admin", adminRoutes);
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

app.get("/test", (req, res) => {
  res.send("Backend working 🚀");
});

const PORT = process.env.PORT || 5000;

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB:", err));