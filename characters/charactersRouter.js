const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get('/:id', function(req, res) {
  const { id } = req.params;
  Character.findOne({ key: id })
    .populate('homeworld')
    .then(character => res.json(character))
    .catch(err => res.status(500).json(err));
})

module.exports = router;
