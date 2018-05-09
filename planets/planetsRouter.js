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
            .populate('species')
            .then(characterList => {
                let key = characterList.key;

                Character
                    .find({ homeworld_key: key})
                    .then(actors => {
                        characterList.characters = actors;
                    })
                    .then(() => {
                        res.status(200).json(characterList)
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            // })
            // .then(speciesList => {
            //     let key1 = speciesList.key

            //     Specie
            //         .find({ homeworld_key: key1 })
            //         .then(formOfLife => {
            //             speciesList.species = formOfLife;
            //         })
            //         .then(() => {
            //             res.status(200).json(speciesList)
            //         })
            //         .catch(err => {
            //             res.status(500).json(err);
            //         })
            })
            .catch(err => {
                res.status(404).json(err);
        })
    })

module.exports = router;
