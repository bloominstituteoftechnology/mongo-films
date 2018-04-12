const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Character.find({}).sort('key')
        .select('_id name gender height skin_color hair_color eye_color')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });

module.exports = router;
