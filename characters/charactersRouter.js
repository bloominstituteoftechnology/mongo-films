const express = require('express');
const Character = require('./Character.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Character.find()
      .then(chars => res.json(chars))
      .catch(err => res.json("Error fetching characters."))
  })

module.exports = router;
