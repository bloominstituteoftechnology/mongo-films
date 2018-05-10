const express = require("express");

const Character = require("./Character.js");

const router = express.Router();

router.route("/").get(get);

const Film = require("../films/Film");
const Vehicle = require("../vehicles/Vehicle");

//returns a list of all characters
function get(req, res) {
  Character.find()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      errorMessage: "The friends information could not be retrieved.";
    });
}

//returns a specific character
router.route("/:id").get((req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .populate("homeworld", "climate -_id")
    .then(char => {
      Film.find({ characters: { _id: id } })
        .select("title")
        .then(films => {
          const character = { ...char._doc, movies: films };
          res.status(200).json(character);
        });
    })
    .catch(err => {
      console.log("we have an error: ", err);
      res.status(500).json(err);
    });
});

router.get("/:id/vehicles", (req, res) => {
  const { id } = req.params;

  Vehicle.find({ pilots: id }, "vehicle_class")
    // .populate("vehicle")
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log("we have an error: ", err);
      res.status(404).json(err);
    });
});

module.exports = router;
