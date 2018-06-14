const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

module.exports = router;
router
.route('/')
.get((req, res) => {
    Specie.find()
    .then(species => {
        res.status(200).json(species)
    })
    .catch(error => {
        res.status(500).json(error);
    })
})
router
.route('/:id')
.get((req, res) => {
    species.findById(id)
    .populate('homeworld')
    .then(character => {
        res.status(200).json(character)
    })
    .catch(error => {
        res.status(500).json(error);
    })
}) 
module.exports = router;