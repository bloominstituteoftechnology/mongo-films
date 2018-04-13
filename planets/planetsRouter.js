const express = require("express");

const Planet = require("./Planet.js");
const Character = require("../characters/Character.js");
const Specie = require("../species/Specie.js");

const router = express.Router();


router.route("/").get((req, res) => {

	Planet.find()
		.then(planets => {
			res.status(200).json(planets);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.route("/:id").get((req, res) => {
	const { id } = req.params;

	Character.find({ homeworld: id })
		.then(chars => {
    Specie.find({ homeworld: id })
    	.then(species => {
     	 res.status(200).json({ Character: chars, Specie: species });
    });
  });
});


module.exports = router;
