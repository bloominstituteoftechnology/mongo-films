const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Film = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  episode: Number,
  edited: { type: Date, default: Date.now },
  planet_ids: [Number],
  producer: String,
  title: { type: String, required: true },
  director: String,
  release_date: String,
  opening_crawl: String,
  character_ids: [Number],
  specie_ids: [Number],
  key: { type: Number, unique: true },
  starship_ids: [Number],
  vehicle_ids: [Number],
  characters: [{ type: ObjectId, ref: 'Character' }], // characters
  starships: [{ type: ObjectId, ref: 'Starships' }], // starships
  planets: [{ type: ObjectId, ref: 'Planet' }], // planets
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }], // vehicles
  species: [{ type: ObjectId, ref: 'Specie' }] // species
});

module.exports = mongoose.model('Film', Film);
