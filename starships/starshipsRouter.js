const express = require('express');
const Starship = require('./Starship.js');
const router = express.Router();

// add endpoints here
router.get('/', async (req, res) => {
    try {
      const starships = await Starship.find({})
        .populate('pilots')
        .select('starship_class hyperdrive_rating')
      res.json(starships)
    } catch (err) {
      res.status(500).json({ err: err.message })
    }
  })
module.exports = router;
