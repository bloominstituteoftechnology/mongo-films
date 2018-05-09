const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie.js");

const router = express.Router();

// add endpoints here
router.get("/:id", async (req, res) => {
  try {
    const chars = await Character.find({ homeworld: req.params.id }).select(
      "name"
    );
    const species = await Specie.find({ homeworld: req.params.id }).select(
      "name"
    );

    res.status(200).json({ chars, species });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
