const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');

const router = express.Router();

// add endpoints here
router.get('/', function (req, res) {
    Character
        .find()
        .then(chars => res.status(200).json(chars))
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', function(req, res) {
    const { id } = req.params;

    Character
        .findById(id)
        .populate('homeworld', 'climate -_id')
        .then(char => {
            Film.find({ characters: id })
                .select('title')
                .then(films => {
                    const character = { ...char._doc, movies: films };
                    res.status(200).json(character);  
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
