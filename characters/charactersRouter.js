const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

router
    .route('/:id')
    .get((req, res) => {

        Character
            .findById(req.params.id)
            .populate('homeworld')
            .then(movieList => {
                let key = movieList.key;

                Film
                    .find({ character_ids: key})
                    .then(films => {
                        movieList.movies = films;
                    })
                    .then(() => {
                        res.status(200).json(movieList)
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            })
            .catch(err => {
                res.status(404).json(err);
            })
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {

        Character
            .findById(req.params.id)
            .then(vehicleList => {
                let key = vehicleList.key;

                Vehicle
                    .find({ pilot_keys: key })
                    .then(vehicles => {
                        res.status(200).json(vehicles)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            })
            .catch(err => {
                res.status(404).json(err)
            })
    })

router
    .route('/')
    .get((req, res) => {
        const heightQuery = req.query.minheight;

        const query = 

        Character
            .find({})

            if (heightQuery) {
                query
                    .find({ height: { $gt: Number(heightQuery) }, gender: 'female' })
            }
            query
                .then(characters => {
                res.status(200).json(characters);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

module.exports = router;
