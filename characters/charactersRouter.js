const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        const heightQuery = req.query.minheight;
        const query = Character.find({})

            if (heightQuery) {
                query.find({ height: { $gt: Number(heightQuery) }, gender: 'female' })
            }
            query.then(characters => {
                res.status(200).json(characters);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    Character.findById(id).then(data => {
        if (data.movies.length === 0) {
            let addMoreMovies = [];
            Film.find({ characters: id })
            .then(films => {
                addMoreMovies = films.map(eachFilm => {
                    return Character.findByIdAndUpdate(
                        id,
                        {$push: { movies: eachFilm._id }},
                        { new: true }
                    );
                });
            })
            .then(() => {
                Promise.all(addMoreMovies).then(() => {
                    Character.findById(id)
                    .populate('movies', 'title -_id')
                    .then(returnData => {
                        res.send(returnData);
                    });
                });
            });
        } else {
            data
            .populate('movies', 'title')
            .execPopulate()
            .then(returnData => {
                res.send(returnData);
            });
        }
    });
});

router.get('/:id/vehicles', (req, res) => {
    const id = req.params.id;
    Vehicle.find({ pilots: id }).select('vehicle_class').then(vehicles => {
        res.send(vehicles);
    });
});

module.exports = router;
