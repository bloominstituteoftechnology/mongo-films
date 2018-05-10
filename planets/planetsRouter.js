const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

// add endpoints here


router.get('/', (req, res) => {
  Planet
    .find()
    .then(planet => {
      res
        .status(200)
        .json(planet);
    })
    .catch(error => {
      res
        .status(500)
        .json({error: 'Could not retrieve data!'})
    })
})
// router.get(':/id', (req, res) => {
//   const { id } = req.params;

//   const chars = Character.find({ homeworld: id })
//   const species = Character.find({ homeworld: id })
  
// })

module.exports = router;
