const express = require('express');

const Character = require('./Character.js');
const planetModel = require('../planets/Planet');
const filmModel = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.route('/:id').get((req, res) => {
  Character.findById(req.params.id)
    .populate('homeworld')
    .populate('movies', 'title -_id')
    .then(character => {
      res.status(200).json(character);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.route('/:id/vehicles').get((req, res) => {
  let id = req.params.id;
  Vehicle.find({ pilotes: { _id: id } })
    .then(vehicles => {
      res.status(200).json(vehicles);
      console.log(vehicles);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/', (req, res) => {
  Character.find({ gender: 'female', height: { $gt: req.query.minheight } })
    .then(characters => {
      res.send(characters);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
