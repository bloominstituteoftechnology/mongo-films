const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here


router
    .route('/')
    .get((req, res) => {
        Film.find({})
            .sort('episode') //order by episode
            //popuate with these two tables
            .populate('character', { name: 1, created: 1, gender: 1, height: 1, hair_color: 1, skin_color: 1, birth_year: 1, _id: 0 })
            .populate('planet', { climate: 1, surface_water: 1, name: 1, created: Date.now, _id: 0 })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })
router  
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
            .populate('planets', 'name climate terrain gravity diameter -_id')
            .populate('characters', 'name gender height skin_color hair_color eye_color -_id')
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')
                .then(resource => {
                    res.status(201).json(resource)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err)
                })
    })



module.exports = router;
