const express = require('express');
const Vehicle = require('./Vehicle.js');
const router = express.Router();

// add endpoints here
router.get("/", (req, res) => {
    Vehicle.find()
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "No Such Vehicle" });
      });
  });
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    Vehicle.findById(id)
      .then(vehicle => {
        res.status(200).json(vehicle);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "No Such Vehicle" });
      });
  });
module.exports = router;
