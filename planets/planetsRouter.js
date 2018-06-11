const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js')
const Specie = require('../species/Specie.js')
const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router
    .route('/')
    .get((req, res) => {
    Planet.find().then(planet => { // find all planets and return them
        res.status(200).json({ planet })
    }).catch(err => sendUserError(500, err.message, res))
})

  
router 
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;

        const chars = Character.find({ homeworld: id }); // Find entries in the Character collection where the homeworld matches the req.params.id
        const species = Specie.find({ homeworld: id }); // Find entries in the Specie collecton where the homeworld matches the req.params.id
    
        Promise.all([chars, species]).then(results => { // Wait for the find request from Character and Specie to resolve before returning
            const [ characters, species ] = results; // same as saying const characters = results[0] const species = results[1]
    
            res.status(200).json({ characters, species }) // return characters and species that have the given planet as their homeworld
        })
        .catch (err => res.send(err));
    })
/* My original code was:
router 
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Planet.findById(id)
        .then(planet => {
        Character.find({ homeworld: id })
        .then(characters => {
            Specie.find({ homeworld: id })
                .then(species => {
                    let natives = Object.assign(planet, {
                       characters, species})
                    res.json({ natives })
                })
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json({err}))
    }) 
    */

module.exports = router;
