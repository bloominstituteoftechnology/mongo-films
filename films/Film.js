const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Film = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  episode: Number,
  edited: { type: Date, default: Date.now },
  planet_ids: [Number],
  planets: [{type: ObjectId, ref: 'Planet'}],
  producer: String,
  title: { type: String, required: true },
  director: String,
  release_date: String,
  opening_crawl: String,
  character_ids: [Number],
  characters: [{type: ObjectId, ref: 'Character'}],
  specie_ids: [Number],
  species: [{type: ObjectId, ref: 'Specie'}],
  key: { type: Number, unique: true },
  starship_ids: [Number],
  starships: [{type: ObjectId, ref: 'Starship'}],
  vehicle_ids: [Number],  
  vehicles: [{type: ObjectId, ref: 'Vehicle'}],
});

module.exports = mongoose.model('Film', Film);
