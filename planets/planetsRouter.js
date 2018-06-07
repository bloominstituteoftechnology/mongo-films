const express = require('express');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');
const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Planet.find({}, {characters: 0, species: 0})
            .then(planet => {
                res.status(200).json(planet);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        Planet.create(req.body)
            .then(planet => {
                res.json(planet);
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id)
            .then(planet => {
                planet.characters = [...characters];
                Specie.find({ homeworld: id }, { _id: 0, name: 1 })
                    .then(species => {
                        planet.species = [...species];
                        res.json(planet);
                    })
                    .catch(error => {
                        planet.species = [{ 'Cannot retrieve requested resourse.': error.message}];
                        res.json(202).json(planet);
                    })
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    .delete((req, res) => {
        const { id } = req.params;
        Planet.findByIdAndRemove(id)
            .then(planet => {
                res.json(planet);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        Planet.findByIdAndUpdate(id, req.body, { new: true })
            .then(planet => {
                res.json(planet);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

})

module.exports = router;
