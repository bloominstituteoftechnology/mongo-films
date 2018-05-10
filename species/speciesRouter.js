const express = require('express');
const Species = require('./Specie.js');
const Planet = require('../planets/Planet');
const router = express.Router();

router.route('/').get((req, res) => {
  Species.find()
    .then(species => res.status(200).json(species))
    .catch(err => res.status(500).json("Error."))
})

module.exports = router;
