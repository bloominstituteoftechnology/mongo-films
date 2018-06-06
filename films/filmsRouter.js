const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// const Planet = new mongoose.Schema({
//   edited: { type: Date, default: Date.now },
//   climate: String,
//   surface_water: String,
//   name: { type: String, required: true, index: true },
//   diameter: String,
//   rotation_period: String,
//   created: { type: Date, default: Date.now },
//   terrain: String,
//   gravity: String,
//   orbital_period: String,
//   key: { type: Number, unique: true },
// });

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Film.find()
      .populate("characters", { edited: 0, created: 0, birth_year: 0, key: 0, homeworld_key: 0, homeworld: 0, __v: 0 })
      .populate("planets", { edited: 0, surface_water: 0, rotation_period: 0, created: 0, orbital_period: 0, key: 0, __v: 0, _id: 0 })
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json([{ error: "The character information could not be retrieved." }]);
      });
  })


module.exports = router;
