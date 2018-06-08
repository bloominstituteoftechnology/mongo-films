const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Vehicle.find()
    // .sort('episode')
    .select('pilots  vehicle_class film -_id')
    .populate('characters', 'name gender ') // you can chain populate as long as subsequent populates reference different models.
    // .populate('planets', 'name climate terrain gravity diameter')
    // .where().gt()
    .then(vehicles => res.status(200).json(vehicles))
})

module.exports = router;
