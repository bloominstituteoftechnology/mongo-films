const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Character.findById(id)
    .populate('homeworld')
    .populate('movies')
    .then(char => {
      let key = char.key;
      Film.find({ character_ids: key })
        .then(films => {
          console.log(films);
          char.movies = films;
        })
        .then(() => {
          res.status(200).json(char);
        });
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error getting character by that ID' });
    });
});

module.exports = router;
