const express = require('express');

const Character = require('./Character.js');
const Vehicles = require('../vehicles/Vehicle.js');
const router = express.Router();

// add endpoints here
router
    //Get List Of Characters (No Particular Order)
    .route("/")
    .get((req, res) => {
        const height = req.query.minheight;
        if (height) {
            const query = Character.find({ gender: 'female' }).sort('name');
            Character.find({})
                .sort('name')
            query.select('gender height name').or({ height: { $gt: height } })
            query.then(character => {
                res.status(200).json(character)
            })
        }
        else {
            Character.find({})
                .then(item => {
                    console.log("Get Request From " + req.connection.remoteAddress + " at: "
                        + (time = new Date()));
                    res.status(200).json(item);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        }
    })
//Find By ID
router
    .route("/:id")
    .get((req, res) => {
        Character.findById(req.params.id)
            .populate('homeworld', 'name climate terrain gravity diameter')
            .then(item => {
                res.status(200).json(item);
            })
            .catch(err => {
                console.log("There was a problem retrieving item.");
                res.status(500).json(err)
            });
    })
//find vehicles of a character
router
    .route("/:id/vehicles")
    .get((req, res) => {
        const { id } = req.params;
        console.log(id);
        Vehicles.find({ pilots: id }).select('vehicle_class').then(vehicles => {
            res.status(200).json(vehicles);
        }).catch(err => {
            res.status(500).json(err);
        })
    })

module.exports = router;
