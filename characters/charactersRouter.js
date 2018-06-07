const express = require('express');

const Character = require('./Character.js');

const Film = require('../films/Film.js');

const Vehicle = require('../vehicles/Vehicle.js');

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
      .populate('homeworld', '-_id name climate terrain gravity orbital_period')
      .select('-_id -__v -key -homeworld_key')
      .then(character => {
        Film.find()
          .where('characters').in([req.params.id])
          .select('-_id title opening_crawl release_date')
          .then((movies) => {
            res.json({ character, movies });
          })
          .catch(error => res.status(500).json({ error: 'Error fetching character' }));

      })
      .catch(error => res.status(500).json({ error: 'Error fetching character' }));
  });

  router
    .route('/:id/vehicles')
    .get((req, res) => {
      Vehicle.find()
        .where('pilots').in([req.params.id])
        .then((vehicles) => {
          res.json({ vehicles });
        })
        .catch(error => res.status(500).json({ error: 'Error fetching vehicles' }));
    })

module.exports = router;
