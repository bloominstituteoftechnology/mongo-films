const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Specie.find()
            .populate('homeworld', {name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
            .then(specie => {
                res.json(specie);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        Specie.create(req.body)
            .then(Specie => {
                res.json(Specie)
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Specie.findById(id)
            .then(Specie => {
                res.json(Specie);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Specie.findByIdAndRemove(id)
            .then(Specie => {
                res.json(Specie);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
        })
    })

    .put((req, res) => {
        const { id } = req.params;
        Specie.findByIdAndUpdate(id, req.body, { new: true })
            .then(Specie => {
                res.json(Specie);
            })
            .catch(error => {
                res.status(500).json({ error: error.message})
            })
    })

module.exports = router;
