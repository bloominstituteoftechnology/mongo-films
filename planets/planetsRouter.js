const express = require("express");

const mongoose = require("mongoose");
const Planet = require("./Planet.js");
const Character = require("../characters/Character");
const Specie = require("../species/Specie");

const router = express.Router();

// /api/planets/

router.route("/:id").get((req, res) => {
    // Given a planet Id find all characters born in that planet and all native species. (/api/planet/:id)
    let charsNames;
    Character.find({ characters: mongoose.Types.ObjectId(req.params.id) })
        // .where("homeworld")
        // .equals(req.params.id)
        .then(chars => {
            console.log("++++", chars);
            charsNames = chars.map(char => char.name);
        });
    // Planet.findById(req.params.id).then(response => {
    //     res
    //         .status(200)
    //         .json(response)
    //         .catch(err => {
    //             res.status(500).json(err);
    //         });
    // });
});

module.exports = router;
