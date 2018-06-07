const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        const query = {};
        if (req.query) {
            for (let key in req.query) {
                query[key] = { $regex: req.query[key], $options: 'i' };
            }
        }
            Film.find(query)
                .sort('episode')
                .populate(
                    'charaters',
                    {'_id': 0, 'name': 1, 'gender': 1, 'height': 1, 'skin_color': 1, 'hair_color': 1, 'eye_color': 1}
                )
                .populate(
                    'planets', 
                    {'name': 0, 'climate': 1, 'terrain': 1, 'gravity': 1, 'diameter': 1}
                )
                .then(films => res.json(films))
                .catch(error => {
                    res.status(500).json({ error: error.message })
                });
        }
    )

    .post((req, res) => {
        Film.create(req.body)
            .then(film => {
                res.json(film);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
            .populate(
                'characters',
                {'name': 1, 'climate': 1, 'terrain': 1, 'gravity': 1, 'diameter': 1}
        )   
        .then(film => {
            res.json(film);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
    })

    .put((req, res) => {
        const { id } = req.params;
        Film.findByIdAndUpdate(id, req.body, { new: true })
            .populate(
                'characters', 
                {name: 1, gender: 1, height: 1, skin_color: 1, hair_color: 1, eye_color: 1 })
            .populate(
                'planets', 
                {name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1})
            .then(film => {
                res.json(film);
            })
            .catch(error => {
                res.status(500).json({ error: error.message});
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Film.findByIdAndRemove(id)
        .then(Film => {
            res.json(Film);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
    })


module.exports = router;
