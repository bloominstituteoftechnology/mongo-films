const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character');
const Species = require('../species/Specie'); 

const router = express.Router();

// add endpoints here

//Given a planet Id find all characters born in that planet and all native species. (/api/planet/:id)
//e.g http://localhost:5000/api/planets/5aa995d3b97194b732c16810 

router.get('/:id', function (req, res) {
    const { id } = req.params; 
    const chars = Character.findById({ homeworld: id }); 
    const species = Species.find({ homeworld: id }); 

    Promise.all([chars, species])
    .then(results => {
        const [characters, species] = results; 
        res.status(200).json({ characters, species }); 
    })
    .catch( error => res.send(error)); 
}); 

module.exports = router;
