const express = require('express');
const Film = require('./Film.js');
const Character = require('../characters/Character');
const router = express.Router();

//Return a list of all films. (/api/films)
//populate planets, include: name, climate, terrain, gravity and diameter
//populate character information. only include: _id, name, gender, height, skin_color, hair_color and eye_color
//Postman Test ok! http://localhost:5000/api/films
router.get('/', function(req, res) {
    let query = Film.find()
    .select('producer release_date episode title director')
    .populate('planets', 'name climate terrain gravity diameter -_id')
    .populate('characters', 'name gender height skin_color hair_color eye_color');

    const { producer, released } = req.query;
    //order by episode from 1-6
    query.sort('episode')

    //Find all films produced by Gary Kurtz - Postman Test ok! http://localhost:5000/api/films?producer=gary+kurtz
    if (producer) {
        const filter = new RegExp(producer, 'i');
        query.where({ producer: filter})
    }
    //Find all films released in 2005. (/api/films?released=2005) - Postman Test ok! http://localhost:5000/api/films?released=2005 
    if (released) {
        query.where({ release_date: {$regex: released, $options: 'i' } });
    }

    query.then(films => res.status(200).json(films));
});

module.exports = router;
