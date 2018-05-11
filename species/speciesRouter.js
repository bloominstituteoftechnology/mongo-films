const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
  Specie.find().then(response => res.json(response)).catch(err => res.json(err))
})

module.exports = router;
