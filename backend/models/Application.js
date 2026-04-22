const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  location: {
    type: String,
  },

  role: {
    type: String,
    enum: ["guide", "driver", "host", "photographer"],
    required: true,
  },

  experience: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);