const express = require('express');
const Film = require('./Film.js');
const Character = require('../characters/Character');
const Planet = require('../planets/Planet');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { producer, released } = req.query;
    const query = Film.find();
    
    query.populate('characters', 'name gender _id height skin_color hair_color eye_color');
    query.populate('planets', 'name climate terrain gravity diameter');
    
    // api/films?producer=gary+kurtz
    if (producer) query.where({ producer: new RegExp(producer, 'i') })
      .then(films => res.json(films))
      .catch(err => res.json(`Cannot find and films produced by ${producer}`));
    
    // api/films?released=2005
    if (released) query.where({ release_date: new RegExp(released, 'i') })
      .then(films => res.json(films))
      .catch(err => res.json(`Cannot find any films released in ${released}`));
    
    // api/films
    query.then(films => res.json(films)).catch(err => res.json("There was an error."))

  })


module.exports = router;
