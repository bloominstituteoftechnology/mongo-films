const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
.route('/')
.get((req, res) => {
    Starship.find()
    .then(startships => {
        res.status(200).json(starships)
    })
    .catch(error => {
        res.status(500).json(error);
    })
})
router
.route('/:id')
.get((req, res) => {
    Starship.findById(id)
    .populate('pilots')
    .then(character => {
        res.status(200).json(character)
    })
    .catch(error => {
        res.status(500).json(error);
    })
}) 
module.exports = router;

