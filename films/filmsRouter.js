const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const producerFilter = req.query.producer;

  let query = Film.find({}).sort('episode');
  // .populate('characters', 'name gender height skin_color')
  // .populate('planets', 'name climate terrain gravity diameter');

  if (producerFilter) {
    const producerRegx = new RegExp(producerFilter, 'i');
    query.select('title producer').where({ producer: producerRegx });
  }

  query.then(films => {
    res.json(films);
  });
});

module.exports = router;
