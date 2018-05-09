const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/', (req, res) => {
  Character.find()
  .then(character => {
    res.status(200).json(character);
  })
  .catch (error => {
    res.status(500).json({error: 'Could not retrieve data!'})
  })
})

module.exports = router;
