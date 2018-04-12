const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Character.find({})
        .sort('episode')
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
            res.status(500).json({ error: 'Characters could not be retrieved'})
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      Character.findById(req.params.id)
      .populate('homeworld')
        .then(character => {
          res.status(200).json(character);
        })
        .catch(err => {
          res.status(500).json({errorMessage: 'The character information could not be retrieved.'})
        })
      })

module.exports = router;
