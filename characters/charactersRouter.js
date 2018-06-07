const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle')
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        const { minheight } = req.query;
        if(minheight){
            Character
                .find({"$and": [{ "height": { "$gt": minheight } }, { "gender": "female" }]})
                .select('gender name height')
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(err => res.status(500).json({ error: err.message }))
        }else {
          Character
            .find()
            .populate('homeworld', 'name climate terrain diameter')
            .then(characters => {
                res.status(200).json(characters);
            })
            .catch(err => res.status(500).json({ error: "The character information could not be retrieved" }))  
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Character
            .findById(id)
            .populate('homeworld', '-_id name climate terrain diameter')
            .populate('movies')
            .then(characters => {
                Film
                    .find({characters: id})
                    .select('title')
                    .then(response => {
                        characters.movies = response;
                        res.status(200).json({ data: characters })
                    })
            })
            .catch(err => res.status(500).json({ error: "The character information could not be retrieved" }))
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {
        Character
            .findById(req.params.id)
            .then(characters => {
                Vehicle
                    .find({pilots: req.params.id})
                    .select('vehicle_class')
                    .then(response => {
                        characters.vehicles = response;
                        res.status(200).json({ data: characters })
                    })
            })
            .catch(err => res.status(500).json({error: err.message}));
    })

module.exports = router;
