const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character');

const router = express.Router();

// add endpoints here

module.exports = router;

router.get('/:id/characters', async (req, res) => {
  const characters = await Character.find()
    .where('homeworld_key').equals(req.params.id)
    .populate('homeworld');

  res.status(200).json(characters);
});
