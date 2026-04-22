const mongoose = require("mongoose");
require("dotenv").config();
const Place = require("./models/Place");

// 🔥 Generate 50+ places automatically
const places = Array.from({ length: 50 }, (_, i) => ({
  name: `Hidden Place ${i + 1}`,
  location: ["Pune", "Mumbai", "Nashik", "Konkan", "Satara"][i % 5],
  description: "Beautiful unexplored destination in Maharashtra",
  category: ["fort", "waterfall", "trek", "beach", "temple"][i % 5],
  difficulty: ["Easy", "Medium", "Hard"][i % 3],
  price: Math.floor(Math.random() * 500) + 100,
  guideAvailable: Math.random() > 0.5,
}));

// 🖼️ Add images automatically
const seedData = places.map((p) => ({
  ...p,
  images: [
    {
      image: `https://source.unsplash.com/800x600/?${p.name},travel`,
    },
  ],
}));

// 🚀 Connect & insert data
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // ❌ DO NOT DELETE DATA (keeps old + adds new)
    await Place.insertMany(seedData);

    console.log("🔥 50+ Places Inserted Successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("❌ Error:", err);
    process.exit(1);
  });