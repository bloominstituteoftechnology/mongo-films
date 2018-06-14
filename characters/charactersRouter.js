const express = require('express');

const Character = require('./Character.js');

const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

 router
    .route('/')
    .get((req, res) => {
        const { minheight } = req.query;
      if (minheight)  {
        Character.find({gender: 'female', height: { $gt: minheight }})
        .then(characters => {
            res.status(200).json(characters)
        })
        .catch(error => {
            res.status(500).json(error);
        })
      } else {
        Character.find()
        .then(characters => {
            res.status(200).json(characters)
        })
        .catch(error => {
            res.status(500).json(error);
        })
      }
    })
    router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
        .populate('homeworld')
        .populate('movies')
        .then(character => {
            res.status(200).json(character)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }) 
    router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.find({pilots: id})
        .then(vehicles => {
            res.status(200).json(vehicles)
        })
        .catch(error => {
            res.status(500).json(error);
        })
    }) 


module.exports = router;
