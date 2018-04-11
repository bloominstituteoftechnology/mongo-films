const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here

router.route('/')
    .get((req,res) => {
        Vehicle
        .find({})
        .populate
    })


module.exports = router;
