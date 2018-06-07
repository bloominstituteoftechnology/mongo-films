const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
       Character.find({})
        .then(character => res.json(character))
        .catch(err => res.status(500).json({ error: err })); 
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
        .populate( 'homeworld')
        .populate('film')
        .then(character => 
        res.json(character))
        .catch(err => 
        res.status(500).json({ error: err }));
    })

module.exports = router;
