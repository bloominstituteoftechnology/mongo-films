const express = require('express');

const Planet = require('./Planet.js');
const Character = require('./characters/Character.js');
const Character = require('../species/Specie.js');


const router = express.Router();

// add endpoints here
router.get(':/id', function (req, res) {
    const { id } = req.params;

    const chars = Character.find({ homeworld: id})
    const species = Character.find({ homeworld: id});

    res.json(chars);
});

module.exports = router;
