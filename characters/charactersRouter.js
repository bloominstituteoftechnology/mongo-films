const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Character.findById(id)
  .then(char => {
    Film.find({ character_ids: char.key })
      .populate('characters','name')
      .then(films => (char.movies = films))
      .then(films => res.status(200).json(char));
  });
});

module.exports = router;
