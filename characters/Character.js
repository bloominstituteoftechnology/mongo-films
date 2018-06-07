const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Character = new mongoose.Schema({
  name: { type: String, required: true },
  edited: Date,
  created: Date,
  gender: String,
  height: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  key: { type: Number, unique: true },
  homeworld_key: Number,
  movies: [{ type: Schema.Types.ObjectId, ref: 'Film' }],
  homeworld: { type: Schema.Types.ObjectId, ref: 'Planet' }
  // add homeworld field that links the character to it's planet
});

module.exports = mongoose.model('Character', Character);
