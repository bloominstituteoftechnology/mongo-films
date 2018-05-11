const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Starship.find().then(response => res.json(response)).catch(err => res.json(err))
})

module.exports = router;
