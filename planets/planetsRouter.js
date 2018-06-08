const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character");
const Species = require("../species/Specie");

const router = express.Router();

// add endpoints here

router.route("/").get((req, res) => {
  Planet.find()
    .then(foundPlanet => {
      res.status(200).json(foundPlanet);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const planet = Planet.findById(id);
  const chars = Character.find({ homeworld: id });
  const species = Species.find({ homeworld: id });

  Promise.all([planet, chars, species])
    .then(results => {
      const [planet, characters, species] = results;
      res.status(200).json({ planet, characters, species });
    })
    .catch(error => {
      res.send(error.message);
    });
});

module.exports = router;
