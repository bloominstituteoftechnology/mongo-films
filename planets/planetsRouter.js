const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res, next) => {
  Planet.find()
    .then(planets => res.send(planets))
    .catch((err) => next(err))
})

module.exports = router;
