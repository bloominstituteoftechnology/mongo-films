const express = require('express');

const Character = require('./Character');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

router.route('/').get((req, res) => {
  const { minheight } = req.query;

  let query = Character.find({});

  if (minheight) {
    query
      .where({ gender: 'female' })
      .where('height')
      .gt(Number(minheight));
  }

  query
    .then(chars => {
      res.status(200).json(chars);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.route('/:id').get((req, res) => {
  const { id } = req.params;

  let query = Character.findById(id).populate('homeworld');

  query.then(char => {
    Film.find({ characters: id })
      .select({ title: 1, _id: 0 })
      .then(films => {
        const character = { ...char._doc, movies: films };
        res.status(200).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

router.route('/:id/vehicles').get((req, res) => {
  const { id } = req.params;

  Vehicle.find({ pilots: id })
    .select({ vehicle_class: 1, _id: 0 })
    .then(vehicles => {
      res.status(200).json(vehicles);
    });
});

module.exports = router;
