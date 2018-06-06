const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Species = new mongoose.Schema({
  edited: { type: Date, default: Date.now },
  classification: String,
  name: { type: String, required: true, index: true },
  designation: String,
  created: { type: Date, default: Date.now },
  eye_colors: String,
  people: [Number], // use this to populate the characters link as per readme
  skin_colors: String,
  language: String,
  hair_colors: String,
  average_lifespan: String,
  average_height: String,
  key: { type: Number, unique: true },
  homeworld_key: Number,
  // add homeworld field that links the specie to it's native planet
});

module.exports = mongoose.model('Species', Species);
