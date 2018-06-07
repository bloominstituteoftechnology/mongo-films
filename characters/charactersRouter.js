const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character.find({})
            .then(characters => res.json(characters))
            .catch(err => res.status(500).json({ error: err.message }));
    })

module.exports = router;
