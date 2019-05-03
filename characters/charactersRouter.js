const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

router.get('/', function(req,res) {
  Character.find({})
  .sort('key')
  .then(characters => {
    res.json(characters);
  })
})

router.get('/:_id', function(req,res) {
	const id = req.params._id;
  Character.findOne({_id: id})
  .select('name gender height homeworld movies')
  .populate('homeworld')
  .then(character => {
    Film.find({characters : id })
    .select('title')
    .then(movies => res.json({"character": character, "movies": movies}))
  })
})

router.get('/:_id/vehicles', function(req,res) {
	const id = req.params._id;
  Character.findOne({_id: id})
  .select('name')
  .then(character => {
    Vehicle.find({pilots : id})
    .select('vehicle_class')
    .then(vehicles => res.json({"character": character, "vehicles": vehicles}))
  })
})

module.exports = router;
