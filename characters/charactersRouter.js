const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;

  Character.findOne({ key: id })
    .populate('homeworld')
    .exec()
    .then(character => res.json(character))
    .catch(err => res.status(500).json(err));
});

router.get('/:id/vehicles', function(req, res) {
  const { id } = req.params;

  Vehicle.find({}).where({ pilot_keys: id })
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
