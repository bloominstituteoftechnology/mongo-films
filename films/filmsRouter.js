const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Film.find()
            .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
            .populate('characters', { name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
            .then(films => res.status(200).json(films))
            .catch(err => res.status(500).json({ error: err.message }))
    })
// .post((req, res) => {
//     let vars = ({ name, gender, skin_color, hair_color, height, eye_color, birth_year } = req.body)
//     let newF = new Film(vars)
//     Film.save()
//         .then(newFilm => res.status(201).json(newFilm))
//         .catch(err => res.status(500).json({ error: err.message }))
// })
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

module.exports = router;
