const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.use('/', (req, res, next) => {
  Film.find().populate(['starships', 'vehicles', 'characters', 'species', 'planets'])
    .then(films => res.send(films))
    .catch((err) => next(err))
})

module.exports = router;
