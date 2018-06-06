const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
    Film.find()
    .then((films) => {
        res.status(200).json(films);
    })
})

module.exports = router;
