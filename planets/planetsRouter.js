const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie.js");

const router = express.Router();

// add endpoints here
router.get("/:id", (req, res) => {
  let { id } = req.params;

  Character.find({ homeworld: id }).then(babies => {
    Specie.find({ homeworld: id }).then(animals => {
      res.send({ CharsBorn: babies, NativeStuff: animals });
    });
  });
});

module.exports = router;
