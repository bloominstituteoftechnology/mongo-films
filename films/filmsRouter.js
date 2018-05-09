const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  const producerFilter = req.query.producer;
  const releaseFilter = req.query.released;

  let query = Film.find({}).sort('episode');

  Film.find({})
    .sort('episode')
    .populate('planets', 'name climate terrain gravity diameter')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .exec()
      if (producerFilter) {
        query.select('title producer').where({ producer: /gary kurtz/i });
      } else if (releaseFilter) {
        query.select('title release_date').where({ release_date: /2005/ });
      }

    query.then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while retrieving the films from the database.' });
    });
});

module.exports = router;
