const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here => root imports below
router
    .route('')
    .get((req, res) => {
        Character.find()
            .then(character => {
                res.status(200).json(character);
            })
            .catch(err => {
                res.status(500).json({ error: 'err' })
            });
})

module.exports = router;
