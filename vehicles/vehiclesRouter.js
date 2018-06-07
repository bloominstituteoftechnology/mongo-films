const express = require('express');

const Vehicle = require('./Vehicle.js');
const Character = require('../characters/Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Vehicle
            .find()
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })
  
router
    .route('/:id')
    .get((req, res) => {
        Vehicle
            .findById(req.params.id)
            .populate('pilots', 'name')
            .then()
    })



module.exports = router;
