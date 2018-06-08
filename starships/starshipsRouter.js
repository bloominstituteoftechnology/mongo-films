const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Starship.find()
    .sort('starship_class')
    .select('starship_class hyperdrive_rating pilots -_id')
    .populate('starship', 'starship_class hyperdrive_rating pilots.name -_id') // you can chain populate as long as subsequent populates reference different models.
    // .populate('pilots', 'name -_id')
    // .where().gt()
    .then(starships => res.status(200).json(starships))
})
module.exports = router;
