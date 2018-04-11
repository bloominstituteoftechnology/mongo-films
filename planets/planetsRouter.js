const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Specie = require('../species/Specie');    

const router = express.Router();

router 
    .route('/:id')
    .get((req, res) => {

        Planet
            .findById(req.params.id)
            .populate('characters species')
            .then(characterList => {
                let key = characterList.key;

                Character
                    .find({ homeworld_key: key})
                    .then(actors => {
                        res.status(200).json(actors)
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            })
            .then(speciesList => {
                let key = speciesList.key

                Specie
                    .find({ homeworld_key: key })
                    .then(species => {
                        res.status(200).json(species)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })

            })
            .catch(err => {
                res.status(404).json(err);
            })
    })
module.exports = router;
