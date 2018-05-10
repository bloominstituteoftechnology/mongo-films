const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie.js");

const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
  Planet.find()
    .then(planet => {
      res.status(201).json(planet);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const chars = Character.find({ homeworld: id });
  const species = Specie.find({ homeworld: id });

  Promise.all([chars, species])
    .then(results => {
      const [characters, species] = results;
      res.status(200).json({ characters, species });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
