const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
  //change below to producer query
  const producerFilter = req.query.producer;

  let query =  Film.find({})
    .sort('episode') // sort data by episode
    // .populate('characters planets species') 
    // .select('title producer')
    // .select('name gender height skin_color')

    .populate('characters', 'name gender ehight skin_color')
    .populate('planets', 'name climate terrain gravity diameter');
    
    if (producerFilter) {
      query.where({ producer: /gary kurtz/i });
    }
  query.then(flims => {
    res.json(films);
  });
});

module.exports = router;


/*
// add endpoints here
router.get('/', function(req, res) {
  //change below to producer query
  Film.find({})
    .sort('episode') // sort data by episode
    .populate('characters planets species') 
    // .populate('characters', 'name gender ehight skin_color')
    // .populate('planets', 'name climate terrain gravity diameter')
    
    // .select('name gender height skin_color')
  .then(flims => {
    res.json(films);
  });
});
*/