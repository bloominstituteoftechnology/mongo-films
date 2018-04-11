const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router.route('/:id')
    .get((req,res) =>{
        Character
        .findById(req.params.id)
        .populate('Character', 'homeworld film' )
        .then(char => {
            res.status(200).json(char)
        })
        .catch(error => {
            res.status(500).json({ error: '*Waves Hand* These are not the characters you are looking for.'})
        })
    })

router.route('/:id/vehicles')
    .get((req, res) => {
        Character
        .findById(req.params.id)
        .populate('Character', { pilot: 1, _id: 0} )
        .then(vehic => {
            res.status(200).json(vehic)
        })
        .catch(error => {
            res.status(500).json({ error: '*Waves Hand* These are not the character vehicles you are looking for.' })
        })
    })

module.exports = router;
