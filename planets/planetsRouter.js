const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Species = require("../species/Specie.js");

const router = express.Router();

router.get("/:id", (req, res) => {
  let id = req.params.id;
  const char = Character.find({ homeworld: id }).select("name");
  const spec = Species.find({ homeworld: id }).select("name");
});
// add endpoints here

module.exports = router;
