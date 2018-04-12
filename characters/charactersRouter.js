const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        Character.find({})
        .populate('homeworld')
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
        let name = req.params.id;
     

        const regex = new RegExp(name, 'i');
        

        Character.find({})
        .populate('homeworld')
        .where({name: regex})
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })

module.exports = router;
