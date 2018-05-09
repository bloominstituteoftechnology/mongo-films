const express = require('express');
const Planet = require('./Planet.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => res.json(planets))
      .catch(err => res.json("Cannot fetch planets."))
  })

module.exports = router;
