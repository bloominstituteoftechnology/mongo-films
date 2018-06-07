const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        // req.query.producer ?
        if (req.query.producer) {
            // console.log(Object.keys(req.query))
            Film.find({ producer: { $regex: `.* 2005. * ` } })
                .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
                .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
                .then(films => res.status(200).json(films))
                .catch(err => res.status(500).json({ error: err.message }))
        } else if (req.query.released) {
            // console.log(Object.keys(req.query))
            let regex = new RegExp(escapeRegex(req.query.released), 'gi')
            Film.find({
                "release_date": regex
            })
                .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
                .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
                .then(films => res.status(200).json(films))
                .catch(err => res.status(500).json({ error: err.message }))
        }

        else {
            // console.log(Object.keys(req.query))
            Film.find().sort({ episode: 1 })
                .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
                .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
                .then(films => res.status(200).json(films))
                .catch(err => res.status(500).json({ error: err.message }))
        }
    })




router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Film.findById(id)
            .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
            .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
            .then(film => res.status(200).json(film))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/?producer=:producer')
    .get((req, res) => {
        console.log(req.params.producer)
    })


module.exports = router;
