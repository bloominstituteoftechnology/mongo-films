const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        //const { characters_id } = req.params;
       Film.find({})
        .populate( 'planets', {_id:0, edited:0, created:0, key:0, surface_water:0, rotation_period:0, orbital_period:0, __v:0 }) 
        .populate('characters',{edited:0, created:0, key:0, __v:0, birth_year:0, homeworld_key:0, homeworld:0 })
        //.populate('characters')
        .then(film => res.json(film))
        .catch(err => res.status(500).json({ error: err })); 
    })

module.exports = router;
