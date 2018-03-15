const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // const query = Character.findById(id)
  // .populate('homeworld')
  // .populate('films')
  // .then(character => res.status(200).json(character));
  Character.findById(id)
// .populate('homeworld')
// .populate('movies')
.then(char => {
let key = char.key
Film.find({character_ids:key})
  .then(films => char.movies = films)
  .then(()=> res.status(200).json(char))
  })
});

module.exports = router;

Character.findById(id)
// .populate('homeworld')
// .populate('movies')
.then(char => {
let key = char.key
Film.find({character_ids:key})
  .then(films => char.movies = films)
  .then(()=> res.status(200).json(char))
  })