const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const router = express.Router();

// add endpoints here
router.get('/:_id', function(req,res) {
  const id = req.params._id;
  Planet.findOne({_id: id})
  .select('name')
  .then(planet => {
    //res.json({"planet": planet});
    Character.find({homeworld: id})
    .select('name')
    .then(characters => res.json({"planet": planet, "characters": characters}))
  })
})

module.exports = router;
