const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    if (req.query.producers) {
      Film.find()
        .where({ producer: new RegExp(req.query.producers, "gi")})  
        .populate("characters", { edited: 0, created: 0, birth_year: 0, key: 0, homeworld_key: 0, homeworld: 0, __v: 0 })
        .populate("planets", { edited: 0, surface_water: 0, rotation_period: 0, created: 0, orbital_period: 0, key: 0, __v: 0, _id: 0 })
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    } else if (req.query.dates) {
      Film.find()
        .where({ release_date: new RegExp(req.query.dates, "gi")})
        .populate("characters", { edited: 0, created: 0, birth_year: 0, key: 0, homeworld_key: 0, homeworld: 0, __v: 0 })
        .populate("planets", { edited: 0, surface_water: 0, rotation_period: 0, created: 0, orbital_period: 0, key: 0, __v: 0, _id: 0 })
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    } else {
      Film.find()
        .sort("episode")  
        .populate("characters", { edited: 0, created: 0, birth_year: 0, key: 0, homeworld_key: 0, homeworld: 0, __v: 0 })
        .populate("planets", { edited: 0, surface_water: 0, rotation_period: 0, created: 0, orbital_period: 0, key: 0, __v: 0, _id: 0 })
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json([{ error: "The character information could not be retrieved." }]);
        });
    }
  })


module.exports = router;
