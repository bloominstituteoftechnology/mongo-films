const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character");
const Species = require("../species/Specie");

const router = express.Router();

router.get("/", (req, res) => {
  Planet.find()
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "No Planets Maybe Destroyed By DeathStar" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const chars = Character.find({ homeworld: id });
  const species = Species.find({ homeworld: id });

  Promise.all([chars, species])
    .then(results => {
      const [characters, species] = results;
      res.status(200).json({ characters, species });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          errorMessage:
            "Not Found Are Characters"
        });
    });
});

module.exports = router;