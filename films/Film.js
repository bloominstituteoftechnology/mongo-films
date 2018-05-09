const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Film = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  episode: Number,
  edited: { type: Date, default: Date.now },
  planet_ids:  [{type: ObjectId, ref: 'Planet'}],
  producer: String,
  title: { type: String, required: true },
  director: String,
  release_date: String,
  opening_crawl: String,
  character_ids: [{type: ObjectId, ref: 'Character'}],
  specie_ids: [{type: ObjectId, ref: 'Species'}],
  key: { type: Number, unique: true },
  starship_ids: [{type: ObjectId, ref: 'Starship'}],
  vehicle_ids: [{type: ObjectId, ref: 'Vehicle'}],
  // add fields for starships, vehicles, planets, characters and species
  // to link them to the corresponding model
  starships: [{type: ObjectId, ref: 'Starship'}],
  vehicle: [{type: ObjectId, ref: 'Vehicle' }],
  planet: [{type: ObjectId, ref: 'Planet'}],
  character: [{type: ObjectId, ref: 'Character'}],
  species: [{type: ObjectId, ref: 'Species'}]
});



module.exports = mongoose.model('Film', Film);
