const express = require('express');

const Character = require('./Character.js');
const Films = require('../films/Film')

const router = express.Router();

// add endpoints here
router.get('/', function(req, res) {
    Character.find()
    .then(chars => res.status(200).json(chars))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/', function(req, res) {
    const { id } = req.params;
    Character.findById(req.params.id)
    .populate('homeworld', 'climate, -_id')
    .then(chars => {
        Film.find({ characters: id }).then(films => {
            const character = { ...char, movies: film }

        res.status(200).json(chars)
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
