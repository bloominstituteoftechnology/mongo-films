const express = require('express');
const Film = require('../films/Film.js');
const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    let query = Character.findById(id)
    .populate('homeworld')
    .then(character => {
        res.json(character)
    })
    .catch(err => {
        res.err(err)
    })
    /*let query = Character.where({ key: id })
    query.findOne((err, character) => {
        if (err) return handleError(err);
        if (character)
    })
    .populate('homeworld');

     appearedIn = Film.find({})
    .populate('characters')
    .select('key')
    
    
    query.then(character => {
        res.json(character);
    }) */
})


module.exports = router;
