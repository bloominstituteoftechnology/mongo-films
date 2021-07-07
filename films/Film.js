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
  starships: [{
    type: ObjectId,
    required: true,
  }],
  vehicles: [{
    type: ObjectId,
    // type: mongoose.Schema.Types.ObjectId,
    // type: ObjectId,
    ref: 'Vehicle',
    required: true,
    // ref: "Vehicle",
  }],
  // Vehicle: {
  //   type: String,
  // },

  planets: [{
    type: ObjectId,
    ref: 'Planet',
    required: true,
  }],
  characters: [{
    type: ObjectId,
    ref: 'Character',
    required: true,
  }],
  species: [{
    type: ObjectId,
    ref: 'Specie',
    required: true,
  }],
  // COMPLETED<<<< add fields for starships, vehicles, planets, characters and species
  // to link them to the corresponding model
});

module.exports = mongoose.model('Film', Film);
