const express = require('express');
const mongoose = require('mongoose');
const Character = require('./Character.js');
const Film = require('../films/Film');
const Planet = require('../planets/Planet');

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
    const query = Character.findById(id);
    query.populate('homeworld');
    // if(character) query.where({producer: new RegExp(producer, 'i')})
    query.then(character => {
      let key = character.key;
      Film.find({character_ids: key})
      .select('episode')
      .then(films =>{
        const person = {...character._doc, movie: films};
        res.status(200).json(person)
    })   
    .catch(err => {
        res.status(500).json({ errorMessage: "The character information could not be retrieved." })
    })
})
.catch(err => {
    res.status(404).json(err);
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
})
.catch(err => {
    res.status(404).json(err);
});
}

function ihategenders(req, res) {
    const {minheight} = req.query;
    let query = Character.find();
    if(minheight) {
       Character.find({gender: 'female', height: {$exists: true}, $where: "this.height.length > 2"})
    //    .where('height')
    //    .gt('100')
       .sort('-height')
       .then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
    } 
    else

    Character.find().then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
}

module.exports = router;
