const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const { producer, release_date } = req.query;
  let producerQuery = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');

  let releaseQuery = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');

  if (producer) {
    producerQuery.where({ producer });
  }

  if (release_date) {
    releaseQuery.where({ release_date });
  }

  Promise.all([producerQuery, releaseQuery])
    .then(films => {
      res.status(200).json(films);
    });
});

module.exports = router;
