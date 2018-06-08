const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Movies = require('../films/Film.js');
const router = express.Router();

router.get('/', (req, res) => {

    const { minheight } = req.query;
    let query = Character.find();

    if(minheight) {
        query.find({gender: 'female'}).where('height').gt(minheight)
        //freaking A a schema error??? (╯°□°）╯︵ ┻━┻
        
    }
    query.then(characters => {
        res.status(200).json(characters);
    })
    .catch(error => {
        res.status(500).json({error: 'information could not be retrieved'})
    })
  // need to imput gender check and height check



})
.get('/:id', (req, res) => {
    const { id } = req.params;

    const Movies2 = Movies.find()
        .where({ characters: id})
        .select('episode title release_date director producer')
        .sort('episode')
    
    const character2 = Character.find()
    .where({'_id': id})
    .populate('homeworld');
    // .then(char => {
    //     res.status(200).json(char)
    // })
    // .catch(err => {
    // res.status(500).json({error: 'character with id does not exist'})
    // })

    Promise.all([character2, Movies2])
    .then(joined  => {
        const [ _movies_, characters ] = joined;
        res.status(200).json({characters, _movies_});
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
