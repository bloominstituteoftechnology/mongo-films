const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");
const router = express.Router();

router.use("/:id", (req, res, next) => {
  Character.findById(req.params.id)
    .populate("homeworld")
    .then(char => {
      Film.find({ characters: req.params.id })
        .then(films => res.send(Object.assign({}, char, { movies: films })))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
