const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
.route('/')
	.get((req, res) => {
		const { minheight }  = req.query;
		let query = Character.find({})
		if (minheight) {
			Character.find({ gender: 'female', height: {$exists: true}, $where: `this.height >= 100`})
			.then(character => { 
        console.log(character);
        res.status(200).json(character)
        return;
			})
			.catch(err => {
				res.status(500).json({ error: 'There was an error retrieving the data' })
			})
		}
})

module.exports = router;
