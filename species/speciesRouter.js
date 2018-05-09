const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character');

const router = express.Router();

router
    .route('/:id/populate/characters')
    .put((req, res) => {

        Specie
            .findByIdAndUpdate(req.params.id, req.body)
            .populate('characters')
            .then(updatedSpecie => {
                let key = updatedSpecie.key;

                Character
                    .find({ character_ids: key })
                    .then(characters => {
                        res.status(200).json(characters)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

module.exports = router;
