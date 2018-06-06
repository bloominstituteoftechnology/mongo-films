const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/:id')
        .get((req,res) => {
            const { id } = req.params;
            Character.findById(id)
                .populate('homeworld')
                .then(character => {
                    res.json(character)
                })
                .catch(err => {
                    res.json(err)
                })
        })

module.exports = router;