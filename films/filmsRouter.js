const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const { producer, released } = req.query;
        const producerReg = new RegExp(producer, 'i');
        const releasedReg = new RegExp(released, 'i');
        Film.find({})
        .sort('episode')
        .populate('characters', '_id name gender height skin_color hair_color eye_color')
        .populate('planets', 'name climate terrain gravity diameter')
        .where({ producer: producerReg })
        .where({ release_date: releasedReg})
        .then(films => {
            res.status(200).json(films);
        })
        .catch(err => {
            res.status(500).json({ error: 'Films could not be retrieved'})
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      Film.findById(req.params.id)
        .populate('characters')
        .then(films => {
          res.status(200).json(films);
        })
        .catch(err => {
          res.status(500).json({errorMessage: 'The film information could not be retrieved.'})
        })
      })

router
      .route('/?producer=gary+kurtz')
      .ge


module.exports = router;
