const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Character.find()
            .then(character => res.status(200).res.json({ character }))
            .catch(err = res.status(500).json({ err }))
    })

module.exports = router;
