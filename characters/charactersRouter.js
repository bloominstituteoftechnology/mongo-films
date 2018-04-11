const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

// api/character

router.route("/:id").get((req, res) => {
    Character.findById(req.params.id)
        .then(character => {})
        .catch(err => res.status(500).json(err));
});

module.exports = router;
