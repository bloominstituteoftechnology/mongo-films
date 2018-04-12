const express = require("express");

const Specie = require("./Specie.js");
const Character = require("../characters/Character");

const router = express.Router();

// add endpoints here
router.route("/populate/characters").put((req, res) => {
  Specie.find({}).then(species => {
    species.map(specie => {
      let characters = specie.character_keys.map(key => {
        Character.find({ key: key }).then(char => console.log(char.name));
      });
    });
  });
});

module.exports = router;
