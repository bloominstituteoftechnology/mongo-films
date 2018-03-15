const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
  const { producerFilter } = req.query.producer;
  let query = Film.find({})
    .sort('episode')
    .select('title producer')
    // .populate('characters', 'name gender height skin_color')
    // .populate('planets', 'name climate terrain gravity diameter')
  if (producerFilter) {
    query.where({ producer: /producerFilter/i })
  }
  query.then(films => {
    res.status(200).json(films);
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;
