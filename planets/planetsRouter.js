const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Specie = require('../species/Specie')

const router = express.Router();

// add endpoints here

router.route('/')
    .get((req, res) => {
        Planet
        .find({})
        .then(plan => {
            res.status(200).json(plan)
        })
        .catch(error => {
            res.status(500).json({error: '*Waves Hand* These are not the planets you are looking for.'})
        })
    })

router.route('/:id')
    .get((req, res) => {
        id = req.params.id
        Planet
        .findById(id)
        Character
        .find().where('homeworld').equals(id).then(born => {
            Specie
            .find().where('homeworld').equals(id)
            .then(anim => {
                res.status(200).send({CharsBorn: born, NativeSpecies: anim})
            })
            // .then((plan, char, spec) => {
            //     res.status(200).json(plan, char, spec)
            // })
        })

        .catch(error => {
            res.status(500).json({ error: '*Waves Hand* This is not the planet you are looking for.'})
        })
    })

    // .get((req,res) => {
    //     id = req.params.id
    //     Planet
    //     .findById(id)
    //     Character
    //     .find().where('homeworld').equals(id)
    //     .then(home => {
    //         res.status(200).json(home)
    //     })
    //     .catch(error => {
    //         res.error(500).json({ error: '*Waves Hand* These are not the planets characters you are looking for.' })
    //     })
    // })
    // .get((req,res) => {
    //     id = req.params.id
    //     Planet
    //     .findById(id)
    //     Specie
    //     .find().where('homeworld').equals(id)
    //     .then(spec => {
    //         res.status(200).json(spec)
    //     })
    //     .catch(error => {
    //         res.error(500).json({ error: '*Waves Hand* These are not the planets characters you are looking for.' })
    //     })
    // })


module.exports = router;
