const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Character.find({})
        .then(characters => {
            res.status(200).json(characters);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })

router
    .route('/:id')
    .get((req, res) => {
      const id = req.params.id;

        Character.find({})
        .where({ key: `${id}` })
        .populate('homeworld')
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
