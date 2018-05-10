const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    const producer = req.query.producer;
    const released = req.query.released;

    
    let query = Film.find().sort({ episode: 1 }).populate('characters', '_id name gender height skin_color hair_color eye_color').populate('planets', 'name climate terrain gravity diameter');

    if (producer) {
        const regex = new RegExp(producer, 'i');
        query.where({ producer: regex });
    }

    if (released) {
        const regex = new RegExp(released, 'i');
        query.where({ released: regex });
    }
    
    query.then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
