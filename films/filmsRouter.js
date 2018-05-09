const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res => {
    const producerFilter = req.query.producer;
    const filmReleased = req.query.released;

    let query = Film.find({}).sort('episode')
        .populate('characters', 'name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter');


});

module.exports = router;
