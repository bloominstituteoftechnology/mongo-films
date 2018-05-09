const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const charPlanet = require('../planets/Planet');
const chars = require('../characters/Character');
const charVehicle = require('../vehicles/Vehicle');
const charSpecie = require('../species/Specie');
const charStarship = require('../starships/Starship');

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
  characters: [{ type: ObjectId, ref: 'Character' }],
  planets: [{ type: ObjectId, ref: 'Planet' }],
  species: [{ type: ObjectId, ref: 'Specie' }],
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  starships: [{ type: ObjectId, ref: 'Starship' }],
});

// Film.methods.findByReleasedDate = function(rDate, cb) {
//   const film = this;
//   film.findOne({ rDate: release_date }, (err, film) => {
//     if (err) return cb(err);
//     cb(null, film);
//   });
// };

module.exports = mongoose.model('Film', Film);
