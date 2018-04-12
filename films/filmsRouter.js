const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// /api/films

router.route("/").get((req, res) => {
    // let query;
    const { producer, released } = req.query;
    if (producer) {
        const regex = new RegExp(producer, "i");
        query = { producer: regex };
    }
    if (released) {
        const regex = new RegExp(released, "i");
        query = { release_date: regex };
    }

    Film.find(query)
        .populate("characters", {
            edited: 0,
            created: 0,
            birth_year: 0,
            key: 0,
            homeworld_key: 0,
            homeworld: 0,
        })
        .populate("planets", {
            _id: 0,
            name: 1,
            climate: 1,
            terrain: 1,
            gravity: 1,
            diameter: 1,
        })
        .then(films => {
            res.status(200).json(films);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
