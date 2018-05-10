const express = require("express");

const Film = require("./Film.js");

const router = express.Router();

// add endpoints here
router.route("/").get((req, res) => {
	// define query - what we are searching for
	let query = Film.find()
		// filter out unneccesary ids
		.select("-planet_ids -character_ids -specie_ids -starship_ids -vehicle_ids")
		// order episodes from smallest to largest
		.sort("episode")
		// replace character ObjectIds with character data
		.populate(
			"characters",
			"name gender height skin_color hair_color eye_color"
		)
		// replace planet ObjectIds with planet data
		.populate("planets", "name climate terrain gravity diameter");

	query
		.then(films => {
			res.status(200).json(films);
		})
		.catch(err => {
			res.status(500).json({
				err: "Films cannot be retrieved"
			});
		});
});

module.exports = router;
