const express = require("express");

const Specie = require("./Specie.js");

const router = express.Router();

// /api/species/populate/character

router.route("/populate/character").put((req, res) => {
    res.json({ p: 1 });
});

module.exports = router;
