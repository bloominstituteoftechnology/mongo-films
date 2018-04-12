const express = require('express');

const Planet = require('./Planet');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');

const router = express.Router();

// add endpoints here
router.route('/').get((req, res) => {
  Planet.find({})
    .then(planets => {
      res.status(200).json(planets);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  let query1 = Character.find({ homeworld: id }).select({ name: 1, _id: 0 });
  let query2 = Specie.find({ homeworld: id }).select({ name: 1, _id: 0 });
  query1.then(chars => {
    res.status(200).json(chars);
  });
});

module.exports = router;
