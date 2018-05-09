const express = require('express');
const Character = require('./Character.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Character.find()
      .then(chars => res.json(chars))
      .catch(err => res.json("Error fetching characters."))
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .then(char => res.json(char))
      .catch(err => res.status(500).json("Cannot fetch character with the provided ID."))
  })
  
module.exports = router;
