const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.route('/')
    .get((req, res) => {
        Film
        .find({})
        .sort('episode')
        .populate('Character', '_id name gender height skin_color hair_color eye_color')
        .populate('Planet', 'name climate terrain gravity diameter')
        .then(film => {
            res.status(200).json(film)
        })
        .catch(error =>{
            res.status(500).json({ error: '*Waves Hand* These are not the films you are looking for.' })

        })
    })



// router.route('/:id')
// .get((req, res) => {
//     Film
//     .findById(req.params.id)
//     .
// })

module.exports = router;
