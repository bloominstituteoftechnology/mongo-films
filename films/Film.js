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
  starships: [{ type: ObjectId, ref: 'Starship'}],
  vehicle: [{ type: ObjectId, ref: 'vehicle'}],
  planets: [{ type: ObjectId, ref: 'Planet'}],
  name: String,
  climate: String,
  terrain: String,
  gravity: Number,
  diameter: Number,
  characters: [{ type: ObjectId, ref: 'Character'}],
  _id: Number,
  name: String,
  gender: String,
  height: Number,
  skin_color: String, 
  hair_color: String, 
  eye_color: String,
  species: [{ type: ObjectId, ref: 'Speci'}]
  // add fields for starships, vehicles, planets, characters and species
  // to link them to the corresponding model
  
});

module.exports = mongoose.model('Film', Film);
