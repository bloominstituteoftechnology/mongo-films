const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();


router.route('/').get((req, res) => {
    Planet.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message }));
})

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Planet.findById(id)
        .then(response => {
            let planetKey = response.key;
            let planet = {};
            Character.find({ 'homeworld_key': planetKey })
                .select('name')
                .then(characters => {
                    planet.characters = characters;
                    if (planet.characters.length === 0) planet.characters = `No matching characters`;
                    Specie.find({ 'homeworld_key': planetKey })
                        .select('name')
                        .then(species => { 
                            planet.species = species;
                            if (planet.species.length === 0) planet.species = `No matching species`;
                            res.json(planet);
                        })
                        .catch(err => res.status(500).json({ error: err.message }));
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

module.exports = router;
