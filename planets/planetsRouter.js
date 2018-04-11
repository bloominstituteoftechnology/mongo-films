const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here
router
    .route("/")
    .get((req, res) => {
        Planet.find({})
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
