const express = require("express");

const Character = require("./Character.js");

const Vehicle = require("../vehicles/Vehicle.js");

const Film = require("../films/Film.js");

const router = express.Router();

const mongoose = require("mongoose");

// add endpoints here

router.route("/:id").get(async (req, res) => {
  try {
    const charByID = await Character.findById(req.params.id).populate(
      "homeworld"
    );
    const movies = await Film.where("characters").equals(
      mongoose.Types.ObjectId(req.params.id)
    );
    const moviesMapped = movies.map(title => title.title);
    res.json({ ...charByID._doc, movies: moviesMapped });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.route("/:id/vehicles").get(async (req, res) => {
  try {
    const charVehicles = await Vehicle.find({})
    checkedVehicles = 0;
    const mappedVehicles = charVehicles.map(vehicle => {
      if(vehicle.includes(req.params.id)){
       res.json({vehicle})
      }
    });
    // const checkedVehicles = mappedVehicles.includes(req.params.id);
    console.log(mappedVehicles)
    // console.log(mappedVehicles[20] == (req.params.id));
    // res.status(200).json({ checkedVehicles });
  } catch (error) {
    res.status(500).json({ error: "server had an error" });
  }
});

module.exports = router;
