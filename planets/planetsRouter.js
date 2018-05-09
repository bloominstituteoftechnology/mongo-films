const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');

const router = express.Router();

router.get('/:id', function(req, res){
	const {id} = req.params;
	Character.find({homeworld: id}).then(char => {
		res.json(char);
	});
});

module.exports = router;
