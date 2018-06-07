const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character.find({}, {'_id': 1, 'name': 1, 'gender': 1, 'height': 1, 'skin_colpr': 1, 'hair_color': 1, 'eye_color': 1})
        .then(characters => res.json(characters))
        .catch(err => res.status(500).json({error: err}))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id }  = req.params;
        Character.findById(id)

        .populate('Planet')
        .then(foundCharacter => res.json(foundCharacter))
        .catch(err => res.status(500).json({error: err}))
    })

module.exports = router;
