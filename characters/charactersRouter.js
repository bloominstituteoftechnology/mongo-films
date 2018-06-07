const express = require('express');

const Character = require('./Character.js');

const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    Character.find()
      .then(characters => {
        res.json({ characters });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching characters' }));
  })

router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      .populate('homeworld')
      .then(character => {
        Film.find()
          .where('characters').in([req.params.id])
          .then((movies) => {
            res.json({ character, movies });
          })

      })
      .catch(error => res.status(500).json({ error: 'Error fetching character' }));
  });

module.exports = router;
