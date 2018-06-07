const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {

        const { producer } = req.query;
        if (producer) {
            Film.find(
                {producer: {$regex: producer, $options: 'i'} 
            })
                .then(
                    films => res.json(films
                ))
                .catch(
                    error => res.status(500).json({ error: error}
                ))
        } else {

        Film.find({})
            .sort('episode')
            // .select('episode title')
            .populate(
                'characters',
                '_id, name, gender, height, skin_color, hair_color, eye_color'
            )
            .populate(
                'planets',
                'name, climate, terrain, gravity, diameter'
            )
            .then(films => {
                res.json(films);
            })
            .catch(error => {
                res.status(500).json(error);
            })
        }
    })


module.exports = router;
