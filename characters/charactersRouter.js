const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    //Get List Of Characters (No Particular Order)
    .route("/")
    .get((req, res) => {
        Character.find({})
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
    //Find By ID
router
    .route("/:id")
    .get((req, res) => {
        Schema.findById(req.params.id)
            .then(item => {
                res.json(item);
            })
            .catch(err => {
                console.log("There was a problem retrieving item.");
            });
    })

module.exports = router;
