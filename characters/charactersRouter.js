const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

router.get('/:id', function (req, res) {
    const {id} = req.params;

    Character.findById(id)
        .populate('homeworld')
        .populate('movies').exec()
        .then(char => {
            Film.find({characters: id})
                .select('title')
                .then(films => {
                    const character = {...char._doc, movies: films};
                    res.status(200).json(character);
                })
                .catch(err => {
                    res.status(500).json({error: 'Something went wrong! getting Films.'});
                });
        })
        .catch(error => {
            res.status(500).json({error: 'Something went wrong! getting Characters.'});
        });
});

module.exports = router;
