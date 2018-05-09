const express = require('express');

const Film = require('./Film.js');
const Planet = require('../planets/Planet.js');
const Character = require('../characters/Character');
const router = express.Router();

router
    .route('/')
    .get(get)

function get(req, res) {
    const {producer, release_date} = req.query;
    const query = Film.find({})
    query.sort('episode')

   
    if (producer) query.where({producer: new RegExp(producer, 'i')});
    if (release_date) query.where({release_date: new RegExp(release_date, 'i')});
    query.populate('characters', 'name gender _id height skin_color hair_color eye_color');
    query.populate('planets', 'name climate terrain gravity diameter')
    query.then(films => {

        res.status(200).json(films);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The films information could not be retrieved." })
    });
} 


module.exports = router;
