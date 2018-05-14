const express = require("express");

const Planet = require("./Planet");
const Character = require("../characters/Character");
const Specie = require("../species/Specie");
const router = express.Router();

router.route("/").get((req, res) => {
	Planet.find()
		.then(planets => {
			res.status(200).json(planets);
		})
		.catch(err => {
			res.status(500).json({
				err: "Planets cannot be retrieved"
			});
		});
});

router.route("/:id").get((req, res) => {
	const { id } = req.params;
	const charactersQuery = Character.find({ homeworld: id });
	const speciesQuery = Specie.find({ homeworld: id });
	const planetQuery = Planet.findById(id);

	planetQuery
		.then(planet => {
			Promise.all([charactersQuery, speciesQuery]).then(results => {
				const [charactersQuery, speciesQuery] = results;
				res.status(200).json({
					...planet._doc,
					characters: charactersQuery,
					species: speciesQuery
				});
			});
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Planet could not be found" });
		});
});

module.exports = router;
