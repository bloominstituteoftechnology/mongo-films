const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

const populateQuery_1 = [{
    path: 'homeworld',
    select: '-_id -edited -created -__v -key'
}, {
    path: 'movies'
}];


router.route('/').get((req, res) => {
    const { minheight } = req.query;
    if(minheight) {
        Character.find({ $and: [{ 'gender': 'female'}, { 'height': { $gt: parseInt(minheight)}}] })
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message}));
    } else {
        Character.find()
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    }
})

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
        .populate(populateQuery_1)
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

router.route('/:id/vehicles').get((req, res) => {
    const { id } = req.params;
    Vehicle.find({ pilots: id })
        .select('vehicle_class')
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message}));
})

module.exports = router;
