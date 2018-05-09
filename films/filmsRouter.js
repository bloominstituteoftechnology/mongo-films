const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

//add endpoints here
router.get('/', (req, res) => {
    Film.find()
    .sort('episode')
    .populate('characters','_id', 'name', 'gender')
    .then().catch(error => {
    res.status(500).json(error)
});
});

//episode query
module.exports = router;
