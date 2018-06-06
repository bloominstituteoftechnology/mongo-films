const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route("/")
    .get((req, res) => {
       Character.find()
       .then(characters => {
           res.status(200).json(characters);
       }) 
       .catch(error => {
           res.status(500).json({ error: error.message })
       })
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
        .populate('homeworld')
        .then(charFound => {
            res.status(200).json(charFound);
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
    })

module.exports = router;
