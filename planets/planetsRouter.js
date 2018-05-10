const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Specie');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getById)
    .put(put)
    .delete(destroy)

function get(req, res) {
    Planet.find().then(planet => {
        res.status(200).json(planet);
    });
}

function getById(req, res) {
    const { id } = req.params;

    const chars = Character.find({ homeworld: id });
    const species = Species.find({ homeworld: id });

    Promise.all([chars, species])
        .then(results => {
            const [characters, species] = results;

            res.status(200).json({ characters, species });
        })
        .catch(err => res.send(err));
}

function post(req, res) {
    const planetInfo = req.body;

    const planet = new Planet(planetInfo)

    planet
        .save()
        .then(planet => {
            Planet.find().then(planet => {
                res.status(200).json(planet);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Planet
        .findByIdAndUpdate(id, update)
        .then(planet => {
            Planet.find().then(planet => {
                res.status(200).json(planet);
            });
        });
}

function destroy(req, res) {
    const { id } = req.params;

    Planet
        .findByIdAndRemove(id)
        .then(planet => {
            Planet.find().then(planet => {
                res.status(200).json(planet);
            });
        });
}

module.exports = router;
