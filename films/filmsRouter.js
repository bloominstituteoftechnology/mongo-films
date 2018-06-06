const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
  Film.find()
    .then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .populate("characters", {
      _id: 1,
      name: 1,
      gender: 1,
      height: 1,
      skin_color: 1,
      hair_color: 1,
      eye_color: 1
    })
    .then(foundFilm => {
        res.status(200).json(foundFilm);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = router;
