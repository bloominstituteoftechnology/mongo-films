const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// GET all characters
router.get('/', (req, res) => {
  Character.find({})
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.json(error);
    });
});
// GET character by id
// missing movies property to add to charcters
router.get('/:id', (req, res) => {
  const { id } = req.params;
  let idQuery = Character.findById(id);
  idQuery.populate('homeworld').then(characters => {
    res.status(200).json(characters);
  });
});
module.exports = router;
