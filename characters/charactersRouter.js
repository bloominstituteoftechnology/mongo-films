const express = require("express");

const Character = require("./Character.js");
const Film = require("../films/Film.js");
const Vehicles = require("../vehicles/Vehicle.js");

const router = express.Router();

router
	.route("/")
	.get((req, res) => {
		Character.find({ gender: "female", height: { $gt: 100 } })
			.then(characters => {
				res.send(characters);
			})
			.catch(err => {
				res.send(err);
			});
	})

	.post((req, res) => {
		const char = new Character(req.body);

		char
			.save()
			.then(savedChar => {
				res.status(201).json(savedChar);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	});

router.route("/:id").get((req, res) => {
	const id = req.params.id;

	Film.find({ characters: id })
		.select("_id")
		.then(films => {
			let movies = films.map(film => film._id);
			console.log(movies);
			Character.findByIdAndUpdate(id, { movies: movies }, { new: true })
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
				.populate("movies", {
					title: 1,
					episode: 1
				})
				.then(character => {
					res.status(200).json(character);
				})
				.catch(err => {
					res.status(500).json(err);
				});
		});
});

router.route("/:id/vehicles").get((req, res) => {
	const { id } = req.params;

	Vehicles.find({ pilots: id })
		.populate("pilots", { _id: 0, name: 1 })
		.then(vehicles => {
			res.status(200).json(vehicles);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete("/", (req, res) => {
	const { id } = req.params;
	Character.findByIdAndRemove(id)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put("/", (req, res) => {
	const id = req.params.id;
	const updatedChar = req.body;

	Character.findByIdAndUpdate(id, updatedChar)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
