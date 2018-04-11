const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    const query = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
      .then(films => {
        res.status(200).json(films);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

module.exports = router;
