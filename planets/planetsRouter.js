const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  Planet.find()
    .then(planets => res.status(200).json(planets))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.route("/:id").get((req, res) => {
  let { id } = req.params;
  Planet.findById(id)
    .then(Planet => {
      let pId = Planet.key;
      Specie.find({ homeworld_key: pId }, { name: 1, _id: 0 })
        .then(species => {
          console.log(species);
          Planet.species = [...species];
        })
        .catch(err => res.status(500).json({ error: err.message }));
      Character.find({ homeworld_key: pId }, { name: 1, _id: 0 })
        .then(characters => {
          // console.log(characters)
          Planet.characters = [...characters];
          res.status(200).json(Planet);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
