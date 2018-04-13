const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Specie = new mongoose.Schema({
  edited: { type: Date, default: Date.now },
  classification: String,
  name: { type: String, required: true, index: true },
  designation: String,
  created: { type: Date, default: Date.now },
  eye_colors: String,
  character_keys: [Number], // use this to populate the characters link as per readme
  skin_colors: String,
  language: String,
  hair_colors: String,
  average_lifespan: String,
  average_height: String,
  key: { type: Number, unique: true },
  homeworld_key: Number,
  characters: { type: ObjectId, ref: 'Character' },
  homeworld: { type: ObjectId, ref: 'Planet' },
});

module.exports = mongoose.model('Specie', Specie);
