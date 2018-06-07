const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.get('/', (req, res) => {
    Starship.find()
    .then((starship) => {
        res.status(200).json(starship);
    })
    .catch(err => {
        res.status(500).json({error: 'information could not be retrieved'})  
    })
})

module.exports = router;
