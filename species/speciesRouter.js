const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Specie.find()
            .then(Species => res.status(200).json(Species))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Specie.findById(id)
            .then(Specie => res.status(200).json(Specie))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
