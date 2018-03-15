const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router.get('/:id',  (req, res) => {
  const charId = req.params.id;

  Character.findById(charId)
    .populate('homeworld')
    .then(char => {
      res.send(char);
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

module.exports = router;
