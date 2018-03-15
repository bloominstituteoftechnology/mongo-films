const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const { producer, release_date } = req.query;

  const producerQuery = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');
    
  const releaseQuery = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter');

    if (producer) {
      console.log('here is the films for', producer);
      producerQuery.where({ producer: /gary kurtz/i });
    }

    if (release_date) {
      console.log('here is the film(s) for', release_date);
      releaseQuery.where({ release_date: /2005/ });
    }

    Promise.all([producerQuery, releaseQuery])
      .then(films => {
      res.status(200).json(films);
    });
});

module.exports = router;
