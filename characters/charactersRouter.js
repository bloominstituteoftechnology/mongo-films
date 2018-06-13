const express = require('express');
const Vehicle = require('../vehicles/Vehicle.js');
const Character = require('./Character.js');
const Planet = require ('../planets/Planet.js'); 
const Film = require('../films/Film.js'); 

const router = express.Router();

// add endpoints here 

// GET Character by ID -- show films/homeworld

router
    .route('/')
    .get((req, res) => {
        Character
            .find()
            .then(characters => {
                res.status(200).json(characters); 
            })
            .catch(error => res.status(500).json({ error: error.message }));
    }) 

router.get('/:id', function (req, res) {
    const { id } = req.params; 
    // Add a movies property that should be an array of all the movies when the character appeared.    
    // (Luke Skywalker data/homeworld/films)
     Character
        .findById(id)
        .populate('homeworld', 'name climate terrain -_id')
        .then(char => {
            Film.find({ characters: id })
            .select('title -_id episode release_date')

            .then(films => {
                const character = { ...char._doc, movies: films };

                res.status(200).json(character);
            }); 
        })
        .catch(error => {
            res.status(500).json(character); 
        }); 
}); 

//Vehicles

router
    .route('/:id/vehicles')
    .get(fetchVehicle)

//Gender by height

router 
    .route('/')
    .get(femaleTall)

//Find all female characters taller than 100cm (/api/characters?minheight=100)
// http://localhost:5000/api/characters?minheight=100 

function femaleTall (req, res) {
    const minHeight = req.query.minHeight;
    let query = Character.find({});
    if (minHeight) {
        Character
            .find({ gender: 'female', height: {$exists: true}, $where: `this.height >= ${minHeight}` })
            .then(friends => {
                res.status(200).json(friends);                 
            })
            .catch(error => {
                res.status(500).json({ errorMessage: error.message })
            }); 
    }
}

//Find all vehicles driven by a given character. (/api/characters/:id/vehicles)
//Postman GET Test ok! http://localhost:5000/api/characters/5aa995a3b97194b732c167b8/vehicles (Showing vehiles piloted by Princess Leia)

function fetchVehicle (req, res) {
    const od = req.params.id; 
    Character 
        .findById(id)
        .then(character => {
            let key = character.key; 
    
    Vehicle
        .find({ pilot_keys: key })
        .then(character => {
            res.status(200).json(character);             
        })
        .catch(error => {
            res.status(500).json({ errorMessage: error.message })
        })
        .catch(error => {
            res.status(404).json(error); 
        })
    })
}

module.exports = router;
