const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router.route('/')
.get((req, res) => {
Character.find()
.then(characters => {
  res.status(200).json(characters)
})
.catch(err => {
    res.status(500).json({errorMessage: `The Characters information could not be retrieved.error: ${err}`});
    })
})

module.exports = router;
