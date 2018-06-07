const express = require('express');

const Planet = require('./Planet.js');
const Character = require("../characters/Character.js");

const router = express.Router();

// add endpoints here
router
  .route("/:id").get((req, res) => {
    const { id } = req.params;
    Planet.findById(id)
        .then(planet => {
            Character.find( { homeworld_key: planet.key})
            .select('name gender height')
            .then(chars => {
                res.status(200).json(chars);                
            })
        }) 
  })

module.exports = router;
