const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
    let query  = Film.find();
    query.sort({episode: 1})
    // Film.find()
    .then(film => res.status(200).json(film))
    .catch(err => res.status(500).json(err))
})

module.exports = router;
