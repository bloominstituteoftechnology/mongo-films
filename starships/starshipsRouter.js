const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res)=> {
        Starship.find()
            .populate('pilots', {_id: 0, name: 1, gender: 1})
            .then(starships => {
                res.json(starships)
            })
            .catch(err => res.status(500).json({ error: err.message }));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Starship.findById(id)
            .populate('pilots', {_id: 0, name: 1, gender: 1})
            .then(starship => {
                res.json(starship)
            })
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
