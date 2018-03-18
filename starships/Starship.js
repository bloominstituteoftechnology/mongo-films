const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Starship = new mongoose.Schema({
  pilot_keys: [Number],
  mglt: String,
  starship_class: String,
  hyperdrive_rating: String,
  key: { type: Number, unique: true },
  film: [{ type: ObjectId, ref: 'Film'}],
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  planets: [{ type: ObjectId, ref: 'Planet' }],
  characters: [{ type: ObjectId, ref: 'Character' }],
  species: [{ type: ObjectId, ref: 'Specie' }],
});

module.exports = mongoose.model('Starship', Starship);
