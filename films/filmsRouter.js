const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', function (req, res) {
    
    const query = Film
        .find()
        .sort('episode')
        .select('episode producer title director release_date')
        .populate('planets', 'name climate terrain gravity diameter')
        .populate(
            'characters',
            '_id name gender height skin_color hair_color eye_color'
        );

    const producer = req.query.producer;
    const released = req.query.released;

    if (producer) {
        const profilter = new RegExp(producer, 'i');
        query.where({ producer: profilter })
    }
    if (released) {
        const relfilter = new RegExp(released, 'i');
        query.where({ release_date: relfilter })
    }

    query
        .then(films => 
            res.status(200).json(films)
        )
        .catch(err => 
            res.status(500).json(err)
        );
});

module.exports = router;
