const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', function(req, res) {
  const producerFilter = new RegExp(req.query.producer, 'i');
  const releasedFilter = new RegExp(req.query.released);

  const query = Film.find({})
  .sort('episode')
  .populate('characters', 'name gender height skin_color')
  .populate('planets', 'name climate terrain gravity diameter')
  if (req.query.producer) {
    query.where({ producer: producerFilter })
    .select('title producer');
  } else if (req.query.released) {
    query.where({ release_date: releasedFilter })
    .select('title release_date')
  }

  query.then(films => {
    res.json(films);
  })
  .catch(err => res.status(500).json(err));
});

module.exports = router;
