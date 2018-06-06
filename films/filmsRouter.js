const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Film.find()
    .populate("planets", "climate surface_water name diameter rotation_period terrain gravity orbital_period -_id")
    .populate("species", "classification name designation eye_colors people skin_colors language hair_colors average_lifespan average_height homeworl_key -_id")
    .populate("starships", "pilot_keys melt starship_class hyperdrive_rating")
    .populate("vehicles", "vehicle_class pilot_keys")
    .populate("characters", "name gender height hair_color skin_color eye_color birth_year homeworld_key")
    .then(films => {
      res.json(films);
    })
    .catch(err => {
      console.log(err);
    })
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .populate("planets", "climate surface_water name diameter rotation_period terrain gravity orbital_period -_id")
    .populate("species", "classification name designation eye_colors people skin_colors language hair_colors average_lifespan average_height homeworl_key -_id")
    .populate("starships", "pilot_keys melt starship_class hyperdrive_rating")
    .populate("vehicles", "vehicle_class pilot_keys")
    .populate("characters", "name gender height hair_color skin_color eye_color birth_year homeworld_key")
    .then(response => res.json(response))
    .catch(err => console.log(err));
})

module.exports = router;
