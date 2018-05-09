const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Character
    .find({ _id: id } )
    .then(chars => {
        res.json(chars)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router;
