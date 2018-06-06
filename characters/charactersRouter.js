const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get('/', (req, res) => {
    Character.find()
    .then((character) => {
        res.status(200).json(character);
    })
})

module.exports = router;
