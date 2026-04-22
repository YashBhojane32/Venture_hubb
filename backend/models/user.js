const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user", "guide", "driver", "host", "photographer"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ FIXED EXPORT
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);