const mongoose = require("mongoose");

const options = {
  strict: false,
  timestamp: true
};

const Planet = new mongoose.Schema(
  {
    edited: { type: Date, default: Date.now },
    climate: String,
    surface_water: String,
    name: { type: String, required: true, index: true },
    diameter: String,
    rotation_period: String,
    created: { type: Date, default: Date.now },
    terrain: String,
    gravity: String,
    orbital_period: String,
    key: { type: Number, unique: true }
  },
  options
);

module.exports = mongoose.model("Planet", Planet);
