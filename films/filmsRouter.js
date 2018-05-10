const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    const { producer, release_date } = req.query;
    let query = Film.find().sort({ episode: 1 }).populate('characters', '_id name gender height skin_color hair_color eye_color').populate('planets', 'name climate terrain gravity diameter');

    if (producer) {
        const regex = new RegExp(producer, 'i');
        query.where({ producer: regex });
    }

    if (release_date) {
        const regex = new RegExp(release_date, 'i');
        query.where({ release_date: regex });
    }
    
    query.then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
