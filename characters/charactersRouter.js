const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router
    .route('/')
    .get((req, res) => {
        Character.find({})
        .then(character => {
            res.status(200).json({ character })
        })
        .catch(err => {
            sendUserError(500, "The character information could not be found.", res)
        })
    })
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
                .populate('homeworld', { _id: 0, __v: 0, key: 0})
                .populate('movies')
                .then(foundCharacter => {
                    res.json(foundCharacter);
                })
                .catch(err => sendUserError(500, err.message, res))

        })

router
    .route('/:id/planet')
        .post((req, res) => {
            const { id } = req.params;
            const { planetID } = req.body;
            Character.findById(id)
                .then(foundCharacter => {
                    foundCharacter.homeworld = Object.assign({}, foundCharacter.homeworld, planetID)
                    foundCharacter.save()
                        .then(savedCharacter => res.status(201).json(savedCharacter))
                        .catch(err => sendUserError(500, err.message, res))
                })
                .catch(err => sendUserError(500, err.message, res))
        })
router
    .route('/:id/film')
        .post((req, res) => {
            const { id } = req.params;
            const { filmID } = req.body;
            Character.findById(id)
                .then(foundCharacter => {
                    foundCharacter.movies = Object.assign({}, foundCharacter.movies, filmID)
                    foundCharacter.save()
                    .populate('Character.movies')
                        .then(savedCharacter => res.status(201).json(savedCharacter))
                        .catch(err => sendUserError(500, err.message, res))
                })
                .catch(err => sendUserError(500, err.message, res))
        })

module.exports = router;
