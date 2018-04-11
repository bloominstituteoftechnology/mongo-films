const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
  .route('/')
  .get((req, res) => {
    const producerFilter = new RegExp(req.query.producer, 'i');
    const releasedFilter = new RegExp(req.query.released, 'i');
    const query = Film.find({})
    .sort('episode')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', 'name climate terrain gravity diameter')
    if(req.query.producer) {
        query.where({producer: producerFilter});
    }
    if(req.query.released) {
        query.where({release_date: releasedFilter})
    }
    query.then(films => {
    res.status(200).json(films);
    })
    .catch(err => {
    res.status(500).json(err);
    });
  })    

module.exports = router;
