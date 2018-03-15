const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', function(req, res) {
  const producerFilter = new RegExp(req.query.producer, 'i');

  let query = Film.find({})
  .sort('episode')
  .select('title producer')
  // .populate('characters', 'name gender height skin_color')
  // .populate('planets', 'name climate terrain gravity diameter')
  // .then(films => {
  //   res.status(200).json(films)
  // })
  // .catch(err => res.status(500).json(err));

  if (producerFilter) {
    query.where({ producer: producerFilter });
  }

  query.then(films => {
    res.json(films);
  });
});

module.exports = router;
