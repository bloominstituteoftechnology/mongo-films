const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('homeworld')
            .then(foundCharacter => {
                if (foundCharacter === null) {
                    res.status(404).json({ errorMessage: "The character with the specified ID does not exist." })
                } else {
                    res.status(200).json(foundCharacter);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error reading the DB' });
            });
    })
router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .then(foundCharacter => {
                if (foundCharacter === null) {
                    res.status(404).json({ errorMessage: "The character with the specified ID does not exist." })
                } else {
                    res.status(200).json(foundCharacter);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error reading the DB' });
            });
    })
    

module.exports = router;
