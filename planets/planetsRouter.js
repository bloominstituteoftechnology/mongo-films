const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Planet
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
        Planet
            .findById(req.params.id)
            .then
    })
module.exports = router;
