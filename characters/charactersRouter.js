const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js')

const router = express.Router();

// add endpoints here
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character
      .findById(id)
      .then(char => {
        Film
          .find({character_ids: char.key})
          .then(films => {
            const film_ids = films.map(film => film.id);
            char.films = film_ids;
            res.status(200).json({char});
          }).catch(err => res.status(500).json(err));
      }).catch(err => res.status(500).json(err));
    })


module.exports = router;
