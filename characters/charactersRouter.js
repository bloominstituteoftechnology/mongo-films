const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js')
const Vehicle = require('../vehicles/Vehicle.js')

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

router.get('/:id/vehicles', (req, res) => {
    const id = req.params.id;

    let query = Character.findById(id)
    
    query
    .then(char => {
        Vehicle
        .find()
        .where({ pilots: id })
        .then(vehicles => {
            if(vehicles) {
                const vehicle = { ...char._doc, vehicles: vehicles}
                res.json(vehicle)
            } else {
                res.json(char)
            }
        })
    })
    .catch(err => {
        res.json(err)
    })
})

router.get('/?minheight=100', (req, res) => {

})



module.exports = router;
