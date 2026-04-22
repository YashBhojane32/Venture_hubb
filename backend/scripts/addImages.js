import mongoose from "mongoose";
import Place from "../models/Place.js"; // ⚠️ add .js extension

async function run() {
  try {
    await mongoose.connect(
      "mongodb+srv://yash:12345@cluster0.bydlub4.mongodb.net/venturehub"
    );

    console.log("✅ MongoDB Connected");

    const places = await Place.find();
    console.log(`📦 Found ${places.length} places`);

    for (let place of places) {
      if (place.images && place.images.length > 0) continue;

      const imageUrl = `https://source.unsplash.com/800x600/?${place.name},${place.category},travel`;

      place.images = [{ image: imageUrl }];
      await place.save();

      console.log(`✅ Updated: ${place.name}`);
    }

    console.log("🎉 DONE!");
    process.exit();

  } catch (error) {
    console.log("❌ ERROR:", error.message);
    process.exit(1);
  }
}

run();