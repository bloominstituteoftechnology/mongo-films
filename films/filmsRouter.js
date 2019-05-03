const express = require('express');
const Film = require('./Film.js');
const router = express.Router();

router.get('/', function(req,res) {
  /*
  Film.find({})
  .sort('episode')
  .populate('species')
  .then(films => {
    res.json(films);
  })*/
  const producerFilter = req.query.producer;
  const year2005Filter = req.query.release_date;
  let query = Film.find({})
  .sort('episode')
  .select('title producer release_date');

  if (producerFilter) {
    query.where({ producer: /gary kurtz/i})
  }
  if(year2005Filter) {
    query.where({ release_date: /2005/})
  }

  query.then(films => {
    res.json(films);
  })
})

module.exports = router;
