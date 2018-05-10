const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const producer = req.query.producer;
  const released = req.query.released;
  let query = Film.find().sort('episode')
  .populate('characters', '_id name gender height skin_color hair_color eye_color')
  .populate('planets', 'name climate terrain gravity diameter');
  if (producer) 
    query.where({producer: producer});
  if (released)
    query.where({release_date: {$regex: released}});
  query
    .then(films => {
      res.status(200).json(films);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
