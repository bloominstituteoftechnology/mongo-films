const express = require('express');
const mongoose = require('mongoose');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

const ObjectId = mongoose.Schema.Types.ObjectId;


router.get('/', (req, res) => {
  const minheight = req.query.minheight;
  let query = Character.find()
  if (minheight) {
    query.where('height').gte(Number(minheight));
  }
  query
    .then(chars => {
      res.status(200).json(chars);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Character.findById(id).populate('homeworld')
  .then(char => {
    Film.find({characters: id}).then(films => {
      const ret = {...char._doc, movies: films};
      res.status(200).json(ret);
    })
  })
  .catch(err => req.status(500).json(err))
})

router.get('/:id/vehicles', (req, res) => {
  const id = req.params.id;
  Vehicle.find({ pilots: id })
  .then(vehicles => {
    res.status(200).json(vehicles);
  })
  .catch(err => req.status(500).json(err))
})

module.exports = router;
