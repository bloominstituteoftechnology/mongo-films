const mongoose = require("mongoose");

const Planet = new mongoose.Schema({
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
  key: { type: Number, unique: true },
  //empty arrays have to be instantiated in order for postman to populate the data
  species: [],
  characters: []
});

module.exports = mongoose.model("Planet", Planet);
