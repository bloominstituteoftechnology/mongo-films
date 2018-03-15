const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  const producerFilter = req.query.producer;
  
let query =  Film.find({})
    .sort('episode')
    // .populate('characters planets species')
    // .popuplate('characters', 'name gender height skin_color hair_color eye color')
    // .popuplate('planets', 'name climate terrain gravity diameter')
    .select('title producer')

    if (producer) {
      query.where({ producer: /gary kurtz/i })
  }

    query.then(films => {
      res.json(films);
    })
})

module.exports = router;
