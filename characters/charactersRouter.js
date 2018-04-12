const express = require("express");

const Character = require("./Character.js");
const Vehicle = require("./Vehicle.js");

const router = express.Router();


router.route("/").get((req, res) => {
	Character.find({})
		.then(characters => {
			res.status(200).json(characters);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.route("/:id").get((req, res) => {
	const id = req.params.id;

	Character.findById(id)
		.populate("homeworld", {
			name: 1,
			climate: 1,
			surface_water: 1,
			diameter: 1,
			rotation_period: 1,
			terrain: 1,
			gravity: 1,
			orbital_period: 1
		})
		.then(character => {
			res.status(200).json(character);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.route("/:id/vehicles").get((req, res) => {
	const id = req.params.id;

	Vehicles.find({ pilots: id })
		.populate("pilots", { name: 1, _id: 0 })
		.then(vehicles => {
			res.status(200).json(vehicles);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
