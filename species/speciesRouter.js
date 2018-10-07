const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character.js');
const router = express.Router();

// add endpoints here
router.put('/populate/characters', (req, res) => {
  Specie.find().then(species => {
    Character.find()
      .select('key')
      .then(charKeys => {
        console.log(charKeys);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = router;
