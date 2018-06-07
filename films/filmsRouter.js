const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        //const { characters_id } = req.params;
        const { producer } =  req.query;
        const producerFilter = new RegExp(producer, 'i');
        if( producer ) {
            //Film.find({ producer: {$regex: producer, $options: 'i' }})
            Film.find({})
            .where('producer')
            .regex(producerFilter)
            .then(films => res.json(films))
            .catch(erro => res.status(500).json({ error: error.message}));
        } else {
        Film.find({})//, { episode: 1, title:1})
        .sort({ episode: 1 })
        //.select('episode title director producer')//project only shows selected
        .populate( 'planets', {_id:0, edited:0, created:0, key:0, surface_water:0, rotation_period:0, orbital_period:0, __v:0 }) 
        .populate('characters',{edited:0, created:0, key:0, __v:0, birth_year:0, homeworld_key:0, homeworld:0 })
        .then(films => res.json(films))
        .catch(err => res.status(500).json({ error: error.message })); 
        }
    });

module.exports = router;
