const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character
            .find({})
            .then(users => res.json(users))
            .catch(error => res.status(500).json({ error: error.message}));
    })
    .post((req, res) => {
        const character = ({ name, gender, height } = req.body);
        const newCharacter = new Character(character);
        newCharacter
            .save()
            .then(savedCharacter => res.status(201).json(savedCharacter))
            .catch(error => res.status(500).json({ error: error.message }));
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character
            .findById(id)
            .populate('name gender height -_id')
            .populate('name -_id')
            .then(foundCharacter => res.json(foundCharacter))
            .catch(error => res.status(500).json({ error: error.message }));
    });

module.exports = router;
