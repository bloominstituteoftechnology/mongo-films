const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')
const Vehicle = require('../vehicles/Vehicle')

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router
    .route('/')
    .get((req, res) => {
        let { minheight } = req.query;
        minheight = Number(minheight);
        if (minheight) {
        Character.find({})
        .where('gender').equals('female')
        .where('height').gt(minheight)
        .then(character => {
            res.status(200).json({ character })
        })
        .catch(err => {
            sendUserError(500, "The character information could not be found.", res)
        })
        let { released } = req.query;
        released = Date()
    } else {
        Character.find()
        .then(chars => {
        let character = []
        const promises = chars.map(char => {
            return Film.find({ characters: char.id })
            .select('title')
            .then(films => {
                character.push({ ...char._doc, movies: films });
            })
            .catch(err => sendUserError(500, err.message, res))
        });
        Promise.all(promises).then(char => res.status(200).json(character)).catch(err => sendUserError(500, err.message, res))
    }).catch(err => sendUserError(500, err.message, res))
}})
    // .post((req, res) => {
    //     const character = { name, edited, created, gender, height, hair_color, skin_color, eye_color, birth_year, key, homeworld_key, homeworld } = req.body;
    //     const newCharacter = new Character(character);
    //     newCharacter
    //         .save()
    //         .then(savedCharacter => res.status(201).json(savedCharacter))
    //         .catch(err => sendUserError(500, err.message, res))
    // });

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;            
            Character.findById(id)
                .populate('homeworld', '-_id name climate terrain gravity orbital_period')
                .select('-_id -_v -key -homeworld_key')
                .then(char => {
                    Film.find()
                    .where('characters').in([id])
                    .select('-_id title opening_crawl release_date')
                    .then((movies => {
                        let character = Object.assign({}, char._doc, { movies })
                        res.json({ character })
                    }))
                    .catch(error => res.status(500).json({ error: error }))
                })
                .catch(err => sendUserError(500, err.message, res))

        })

    router
        .route('/:id/vehicles')
            .get((req, res) => {
                const { id } = req.params;
                Vehicle.find()
                    .where('pilots').in([id])
                    .select('-_id vehicle_class')
                    .then((vehicles) => {
                        res.json({ vehicles });
                    })
                    .catch(err => res.status(500).json({ error: 'Error fetching vehicles' }));
            })
module.exports = router;
