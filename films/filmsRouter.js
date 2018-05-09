const express = require('express');
const Film = require('./Film.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    const { producer, released } = req.query;

    // /api/films?producer=gary+kurtz
    if (producer) Film.find({}).where({ producer: new RegExp(producer, 'i') })
      .then(films => res.json(films))
      .catch(err => res.json(`Cannot find and films produced by ${producer}`));
    
    // /api/films?released=2005
    if (released) Film.find({}).where({ release_date: new RegExp(released, 'i') })
      .then(films => res.json(films))
      .catch(err => res.json(`Cannot find any films released in ${released}`));

    Film.find()
      .then(films => res.json(films))
      .catch(err => res.json("There was an error."))
  })


module.exports = router;
