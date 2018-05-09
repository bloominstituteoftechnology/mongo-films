const express = require('express');
const Film = require('./Film.js');
const Character = require('../characters/Character');
const router = express.Router();

// add endpoints here
router
    .route('/')
    .get(get)

//Return a list of all films. (/api/films)
function get(req, res) {
    const {producer, release_date} = req.query;
    const query = Film.find({})
    //order by episode.
    query.sort('episode')

    query
    //Find all films produced by Gary Kurtz (/api/films?producer=gary+kurtz)
    if (producer) query.where({ producer: new RegExp(producer, 'i') });
    //Find all films released in 2005. (/api/films?released=2005)
    if (release_date) query.where({ release_date: new RegExp(release_date, 'i') });
    
    //populate character information. only include: _id, name, gender, height, skin_color, hair_color and eye_color
    query.populate('characters', '_id name gender height skin_color hair_color eye_color');
    //populate planets, include: name, climate, terrain, gravity and diameter
    query.populate('planets', 'name climate terrain gravity diameter');

    query.then(films => {
        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Film info not found.'})
    });
}

module.exports = router;
