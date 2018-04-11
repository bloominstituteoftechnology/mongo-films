const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router
    .route("/")
    .get((req, res) => {
        Vehicle.find({})
            .then(item => {
                console.log("Get Request From " + req.connection.remoteAddress + " at: "
                    + (time = new Date()));
                res.status(200).json(item);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    })
module.exports = router;
