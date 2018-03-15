const express = require("express");
const Film = require("../films/Film.js");
const Character = require("./Character.js");
const Vehicle = require("../vehicles/Vehicle");

const router = express.Router();

// add endpoints here

router.get("/:id", (req, res) => {
  const { characterId } = req.params;
  let charFinder = Character.findOne({ charKey: characterId })
    .populate("homeworld")
    .exec();
  charFinder.then(character => {
    res.json(character);
  });
  charFinder.catch(err => {
    res
      .status(500)
      .json({ message: "There was an error finding the character" });
  });
});

router.get("/:id/vehicles", (req, res) => {
  const characterId = req.params.id;
  let charFinder = Character.findById(characterId);

  charFinder
    .then(character => {
      const key = character.key;
      Vehicle.find({ pilot_keys: key })
        .then(vehicle => {
          res.status(200).json(vehicle);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "There was an error finding the vehicle" });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error finding the ID" });
    });
});

module.exports = router;
