const express = require('express');
const mongoose = require('mongoose');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle');
const Film = require('../films/Film');

const router = express.Router();

// add endpoints here

router.route('/')


    .get((req, res) => {

        Character.find({ })
        .then(char => {
            res.status(200).send(char);
        })
        .catch(error => {
            res.status(500).json({error: '*Waves Hand* These are not the characters you are looking for.'})
        })
    })

router.route('/:id')
    .get((req,res) =>{
        // Character
        // .findById(req.params.id)
        // .populate('movies', 'episode' )
        // .then(char => {
        //     res.status(200).json(char)
        // })
        // .catch(error => {
        //     res.status(500).json({ error: '*Waves Hand* These are not the characters you are looking for.'})
        // })

        Character.findById(req.params.id)
        .populate("homeworld")
        .then(chars => {
          Film.where("characters")
            .equals(mongoose.Types.ObjectId(req.params.id))
            .then(film => {
              let mapFilms = film.map(film => film.title);
              res.json({ ...chars._doc, movies: mapFilms });
            });
        })
        .catch(error => {
            res.status(500).error({ error: '*Waves Hand* This is not the character you are looking for.'})
        })

    })

// router.route('/:id', (req, res) =>{
//     Film
//     .find({character: req.params.id})
// })

router.route('/:id/vehicles')
    .get((req, res) => {
        id = req.params.id
        Character
        .findById(id)
        Vehicle
        .find().where('pilots').equals(id)
        .then(vehic => {
            res.status(200).json(vehic)
        })
        .catch(error => {
            res.status(500).json({ error: '*Waves Hand* These are not the character vehicles you are looking for.' })
        })
    })

module.exports = router;
