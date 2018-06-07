const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
.route('/')
.get((req, res) => {
    Vehicle.find()
    // .populate('characters', 'name gender height skin_color hair_color eye_color')
    // .populate('planets', '-_id name climate terrain gravity diameter')
    // .populate('starships')
    // .populate('vehicles')
    // .populate('species')
    .populate('pilots')
    .then(vehicles => {
      res.json(vehicles);
    })
    .catch(err => res.status(500).json({ error: 'Error reading the DB' }));
})


module.exports = router;
