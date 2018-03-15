const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character');

const router = express.Router();

// Write an endponint (PUT to /api/species/populate/charactes) that will go over the list of all species and using the list of character_keys add a characters field that references the character with the corresponding key in the characters collection. The characters field in species must be of type ObjectId and reference the _id on the characters collection.

router.put('/populate/characters', function(req, res){
	Specie.find({})
	.then(species => {
		// console.log(species[0]); // returns first species object
		// console.log(species[0].character_keys); // return undefined ??

		species.forEach(specie => {
			// console.log(specie.people); // returns people array
			// console.log(specie.homeworld_key); // returns homeworld key
			// console.log(specie.character_keys); // returns undefined ??

			// let promises = specie.character_keys.forEach(key => {
			// // 	//return Character.find({key: key});
			// // });
			// // Promise.all(promises).then(char => {
			// // 	console.log(char);
			// });

			// for(let i = 0; i < specie.character_keys.length; i++){
			// 	console.log(specie.character_keys[i]);
			// }

		});
	});
});

module.exports = router;
