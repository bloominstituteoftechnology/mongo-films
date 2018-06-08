const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Specie.find()
    .sort('name')
    .select('name homeworld average_height classification skin_colors hair_colors eye_colors -_id')
    // .populate('species', '-_id name designation people average_height skin_colors hair_colors eye_colors') // you can chain populate as long as subsequent populates reference different models.
    // .populate('planets', 'name climate terrain gravity diameter')
    // .where().gt()
    .then(species => res.status(200).json(species))
})
module.exports = router;
