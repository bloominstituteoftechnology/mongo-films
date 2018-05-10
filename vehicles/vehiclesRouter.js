const express = require("express");

const Vehicle = require("./Vehicle.js");

const router = express.Router();

// add endpoints here
router.route("/:id/vehicles").get((req, res) => {
    Vehicle.find({ pilots: req.params.id })
      .populate("pilots", "name")
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
module.exports = router;
