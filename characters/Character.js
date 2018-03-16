const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Character = mongoose.Schema({
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
  film: [{ type: ObjectId, ref: 'Film'}],
  starships: [{ type: ObjectId, ref: 'Starship' }],
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  planets: [{ type: ObjectId, ref: 'Planet' }],
  species: [{ type: ObjectId, ref: 'Specie' }],
});

module.exports = mongoose.model('Character', Character);
