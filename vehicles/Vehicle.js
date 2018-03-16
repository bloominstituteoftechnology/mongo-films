const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Vehicle = new mongoose.Schema({
  vehicle_class: String,
  pilot_keys: [Number],
  key: { type: Number, unique: true },
  film: [{ type: ObjectId, ref: 'Film'}],
  starships: [{ type: ObjectId, ref: 'Starship' }],
  planets: [{ type: ObjectId, ref: 'Planet' }],
  characters: [{ type: ObjectId, ref: 'Character' }],
  species: [{ type: ObjectId, ref: 'Specie' }],
});

module.exports = mongoose.model('Vehicle', Vehicle);
