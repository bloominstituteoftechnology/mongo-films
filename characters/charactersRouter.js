const express = require('express');

const Character = require('./Character.js');

const router = express.Router();
const Film = require('../films/Film.js')

// add endpoints here
router.get('/:id', (req, res) => {
    const id = req.params.id;

    let query = Character.find({ _id: id } ).populate("homeworld")

    query
    .then(chars => {
        res.json(chars)
    })
    .catch(err => {
        res.json(err)
    })
})


module.exports = router;
