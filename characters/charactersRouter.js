const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Movies = require('../films/Film.js');
const router = express.Router();

router.get('/', (req, res) => {
    Character.find()
    .then((character) => {
        res.status(200).json(character);
    })
  // need to imput gender check and height check
  


})
.get('/:id', (req, res) => {
    const { id } = req.params;
    Character.findById(id)
    .populate('homeworld', 'name').select('name')
    .then(char => {
        res.status(200).json(char)
    })
    .catch(err => {
    res.status(500).json({error: 'character with id does not exist'})
    })
})
.get('/:id/movies', (req, res) => {
    const { id } = req.params;
    Movies.find()
    .populate('characters', 'episode name').select('name')

    .then(character => {
        res.status(200).json(character)
    }) 
    .catch(err => {
        res.status(500).json({error: 'information could not be retrived'});
    })
})


.get('/:id/vehicle',(req, res) => {
    const { id } = req.params;
    Vehicle.find({pilots: id})
    .then(pilots => {
        res.status(200).json(pilots);
    })
    .catch(err => {
        res.status(500).json({error: 'information could not be retrieved'})
    })
})
module.exports = router;
