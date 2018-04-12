const express = require('express');
const mongoose = require('mongoose');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle');
const Film = require('../films/Film');
// const Planet = require('../planets/Planet')

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
  const id = req.params.id;
  let charFilms;
  Film.find({ characters: mongoose.Types.ObjectId(id) }).then(films => {
    charFilms = films.map(film => film.title);
  });
  Character.findById(id)
    .populate('homeworld')
    .then(characters => {
      res.json({ characters, movies: charFilms });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/:id/vehicles', (req, res) => {
  const charId = req.params.id;
  Vehicle.find({ pilots: mongoose.Types.ObjectId(charId) })
    .populate('pilots', { _id: 0, name: 1 })
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/', (req, res) => {
  const minHeight = parseInt(req.query.minheight);
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const order = parseInt(req.query.order);

  //this is how you type the search in the searchbar
  // http://localhost:5000/api/characters?skip=0&limit=3&order=asc

  Character.find({})
    .skip(skip)
    .sort('_id')
    .limit(limit)
    .then(characters => {
      if (minHeight) {
        characters = characters.filter(
          char => parseInt(char.height) >= minHeight
        );
      }

      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.post('/', (req, res) => {
  const character = new Character(req.body);

  character
    .save()
    .then(savedChar => {
      res.status(200).json({ saved: 'ok', savedChar });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.delete('/', (req, res) => {
  const { id } = req.params;
  Character.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
  const id = req.params.id;
  const updatedChar = req.body;

  Character.findByIdAndUpdate(id, updatedChar)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
