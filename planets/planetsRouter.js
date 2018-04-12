const express = require("express");

const Planet = require("./Planet.js");
const Specie = require("../species/Specie.js");
const Character = require("../characters/Character.js");

const router = express.Router();

// add endpoints here
router.route("/:id").get((req, res) => {
  Planet.findById(req.params.id).then(planet => {
    Character.find({ homeworld: req.params.id }).then(chars => {
      Specie.find({ homeworld: req.params.id }).then(species => {
        res.json({ ...planet._doc, characters: chars, species: species });
      });
    });
  });
});
module.exports = router;
