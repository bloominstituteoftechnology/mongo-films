const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        if (req.query.minheight) {
            Character
                .find({
                    "$and": [
                        { "height": { "$gt": parseInt(req.query.minheight) } },
                        { "gender": "female" }
                    ]
                })
                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
        else {
            Character.find({})
                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Character.findById(id)
            .populate('homeworld', 'name')
            .populate('vehicles')
            .populate('movies')
            .then(charResponse => {
                let obj = charResponse
                Film
                    .find({ characters: id })
                    .select('title')
                    .then(filmResponse => {
                        obj.movies = filmResponse

                        Vehicle
                            .find({ pilots: id })
                            .select('vehicle_class')
                            .then(vehicleResponse => {
                                obj.vehicles = vehicleResponse
                                res.status(200).json({ data: obj })
                            })
                    })

            })
            .catch(err => res.status(500).json({ data: err }))
    })


module.exports = router;
