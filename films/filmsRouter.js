const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get(get)

// Return Films List (/api/films)
function get(req, res) {
    const {producer, release_date} = req.query;
    const query = Film.find({})
    // Order by Episode
    query.sort('episode')

    query
    if (producer) query.where({ producer: new RegExp(producer, 'i') });
    if (release_date) query.where({ release_date: new RegExp(release_date, 'i') });
    
    // Populate Characters (include: _id, name, gender, height, skin_color, hair_color and eye_color)
    query.populate('characters', '_id name gender height skin_color hair_color eye_color');
    // Populate Planets (include: name, climate, terrain, gravity and diameter)
    query.populate('planets', 'name climate terrain gravity diameter');

    query.then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Film info not found.'})
    });
}

module.exports = router;
