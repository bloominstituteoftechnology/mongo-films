const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Starship.find()
            .then(starship => {
                res.status(200).json(starship);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        Starship.create(req.body)
            .then(starship => {
                res.json(starship);
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        Starship.findById(id)
            .then(starship => [
                res.json(starship)
            ])
            .catch( error => {
                res.status(500).json({ error: error.message })
            })
    })

    .delete((req, res) => {
        const { id } = req.params;
        Starship.findByIdAndRemove(id)
            .then(starship => {
                res.json(starship);
            }) 
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        Starship.findByIdAndUpdate(id, req.body, { new: true })
            .then(starship => {
                res.json(starship);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            })
    })

module.exports = router;
