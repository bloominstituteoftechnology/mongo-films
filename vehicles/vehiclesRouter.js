const express = require("express");

const Vehicle = require("./Vehicle.js");

const router = express.Router();

router.route("/").get((req, res) => {
	Vehicle.find()
		.populate("pilots", "name")
		.then(vehicles => {
			res.status(200).json(vehicles);
		})
		.catch(err => {
			res.status(500).json({
				err: "Vehicles cannot be retrieved"
			});
		});
});

module.exports = router;
