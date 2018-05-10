const express = require('express');

const Character = require('./Character.js');

const Vehicles = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Character.find()
  .then(character => {
    res.status(200).json(character);
  })
  .catch (error => {
    res.status(500).json({error: 'Could not retrieve data!'})
  })
})

router.get('/:id', (req, res) => {
  Character.findById(req.params.id)
  .populate('homeworld')
  .then(character => res.status(200).json(character))
  .catch(error => {
    res.status(500).json(error);
  })
})

router.get('/:id/vehicles', (req, res) => {
const { id } = req.params;
Vehicles.find({ pilots: id })
.populate('pilots')
.then(vehicle => {
  res.status(200).json(vehicle);
})
.catch(error => {
  res.status(500).json(err);
  })
})

module.exports = router;
