const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Specie.find({})
        .then(species => res.json(species))
        .catch(err => res.status(500).json({error: err}))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id }  = req.params;
        Specie.findById(id)
        .populate('Planet')
        .then(foundCharacter => res.json(foundCharacter))
        .catch(err => res.status(500).json({error: err}))
    })


module.exports = router;
