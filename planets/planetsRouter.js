const express = require("express");

const mongoose = require("mongoose");
const Planet = require("./Planet.js");
const Character = require("../characters/Character");
const Species = require("../species/Specie");

const router = express.Router();

// /api/planets/

router.route("/:id").get((req, res) => {
    // planet and all native species. (/api/planet/:id)
    let charsNames;
    let nativeSpecies;

    Character.find({
        homeworld: mongoose.Types.ObjectId(req.params.id),
    }).then(chars => {
        charsNames = chars.map(char => char.name);
    });

    Species.find({ homeworld: mongoose.Types.ObjectId(req.params.id) }).then(
        species => {
            nativeSpecies = species.map(specie => specie.name);
        },
    );

    Planet.findById(req.params.id)
        .then(planet => {
            res.status(200).json({
                planet,
                characters: charsNames,
                species: nativeSpecies,
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
