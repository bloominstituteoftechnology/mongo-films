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
      res.status(500).json({ errorMessage: "Could not get planets." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  // below is luis way to find species and chars that have the given planet id as a homeworld
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
        .json({ errorMessage: "Could not get characters/species." });
    });

  // Planet.findById(id)
  //   .then(planet => {
  //     res.status(200).json(planet);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ errorMessage: "Could not get planet." });
  //   });
});

module.exports = router;
