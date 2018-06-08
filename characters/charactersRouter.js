const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const router = express.Router();

const populateQuery = [{
    path: 'homeworld',
    select: '-_id -edited -created -__v -key'
}, {
    path: 'movies'
}, {
    path: 'vehicles'
}];

router.route('/').get((req, res) => {
    Character.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message }));
})

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
        .populate(populateQuery)
        .then(response => {
            if(response === null) res.status(400).json({ error: `The character by that ID does not exist.`});
            Film.find({ characters: id})
                .select('title')
                .then(films => { 
                    console.log(films);
                    response.movies = films;
                    res.json(response);
                })
                .catch(err => res.status(500).json({ error: err.message}));
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

module.exports = router;
