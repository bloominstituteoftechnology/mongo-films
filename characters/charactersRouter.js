const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.route('/')
  .get((req, res) => {
    Character.find()
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json({
          err: "Characters cannot be retrieved"
        })
      })
  })

module.exports = router;
