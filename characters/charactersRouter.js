const express = require("express");

const mongoose = require("mongoose");
const Character = require("./Character.js");
const Film = require("../films/Film");
const Vehicles = require("../vehicles/Vehicle");

const router = express.Router();

// api/character

router.route("/:id").get((req, res) => {
    let charFilms;

    Film.find({ characters: mongoose.Types.ObjectId(req.params.id) }).then(
        films => {
            charFilms = films.map(film => film.title);
        },
    );

    Character.findById(req.params.id)
        .populate("homeworld")
        .then(character => {
            res.status(200).json({ character, movies: charFilms });
        })
        .catch(err => res.status(500).json(err));
});

router.route("/:id/vehicles").get((req, res) => {
    Vehicles.find({ pilots: mongoose.Types.ObjectId(req.params.id) })
        .then(vehicles => {
            // console.log("+++", vehicles);
            let vehicleClass = vehicles.map(vehicle => vehicle.vehicle_class);
            // console.log(vehicleClass);
            res.status(200).json({ vehicles: vehicleClass });
        })
        .catch(err => res.status(500).json(err));
});

router.route("/").get((req, res) => {
    const { minheight } = req.query;

    Character.find()
        .where("gender")
        .equals("female")
        .where("height")
        .gt(minheight)
        .then(chars => {
            res.status(200).json(chars);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
