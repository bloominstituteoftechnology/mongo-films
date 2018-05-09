const express = require('express');

const Character = require('./Character.js');


const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

router
    .route('/:id')
    .get(getid)

router
    .route('/:id/vehicles')
    .get(getvehicle)

router
    .route('/')
    .get(ihategenders)

function getid(req, res) {
    const id = req.params.id;
  Character
  .findById(id)
    // if(character) query.where({producer: new RegExp(producer, 'i')})
    .then(character => {
        if (character.length === 0) {
            res.status(404).json({ message: "The character with the specified ID does not exist." })
        }
        res.status(200).json(character);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The character information could not be retrieved." })
    });
}

function getvehicle(req, res) {
    const id = req.params.id;
    Character
    .findById(id)
    .then(character => {
        let key = character.key;    
    Vehicle.find({pilot_keys: key })
    .then(character => {
        res.status(200).json(character);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The character information could not be retrieved." })
    })
    .catch(err => {
        res.status(404).json(err);
    })
})
}

function ihategenders(req, res) {
    const minheight = req.query.minheight;
    let query = Character.find();
    if(Character.height > 100) {
        query.where({height: minheight});
    }
    Character.find({gender: 'female'}).sort('height').select('name')
    .then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
}

module.exports = router;
