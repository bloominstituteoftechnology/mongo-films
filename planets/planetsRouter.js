const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie.js");

const router = express.Router();

// /api/planets

// GET / ; get all planets
router.route("/").get((req, res) => {
  Planet.find()
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET /:id ; find all characters born in that planet and all native species
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  let planetSpecies;

  Specie.find({})
    .where({ homeworld: id })
    .then(species => {
      planetSpecies = species.map(specie => specie.name);
    });

  Character.find({})
    .where({ homeworld: id })
    .then(planets => {
      res.status(200).json({ planets, native_species: planetSpecies });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
