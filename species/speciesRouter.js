const express = require('express');
const Specie = require('./Specie.js');
const Character = require('../characters/Character.js');
const router = express.Router();

// add endpoints here
router.route("/populate/characters").put((req, res) => {
    Specie.find({}).then(species => {
      species.map(specie => {
        specie.character_keys.map(key => {
          Character.find({ key: key }).then(char =>
            specie.characters.push(char[0]._id)
          );
          Specie.save();
        });
      });
    });
  });
  
module.exports = router;
