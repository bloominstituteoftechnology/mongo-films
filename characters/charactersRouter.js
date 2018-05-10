const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js')

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
    const id = req.params.id;

    let query = Character.findById(id).populate("homeworld")

    query
    .then(char => {
        Film
        .find({ characters: id })
        .select('title')
        .then(films => {
            const character = { ...char._doc, movies: films }
            res.json(character)
        })
    })
    .catch(err => {
        res.json(err)
    })
})


module.exports = router;
