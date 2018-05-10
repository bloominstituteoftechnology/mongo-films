const express = require("express");

const Vehicle = require("./Vehicle.js");

const router = express.Router();

router.get("/", (req, res) => {
  Vehicle.find()
    .select("-pilot_keys")
    .populate("pilots", "name gender height skin_color hair_color eye_color")
    .then(vehicles => {
      res.status(200).json(vehicles);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get vehicles." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Vehicle.findById(id)
    .populate("pilots", "name gender height skin_color hair_color eye_color")
    .then(vehicle => {
      res.status(200).json(vehicle);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not get vehicle." });
    });
});

module.exports = router;
