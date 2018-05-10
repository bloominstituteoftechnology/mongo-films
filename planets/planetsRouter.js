const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Planet.find()
    .then(response => {
      res.json(response);
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Planet.findById(id)
    .then(planet => {
      Character.find()
      .where('homeworld').equals(id)
      .then(response => {
        console.log(response);
        res.json({...planet._doc, characters: [...response]});
      })
    })
})
module.exports = router;
