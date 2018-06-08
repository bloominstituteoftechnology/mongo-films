const express = require('express');
const Vehicle = require('../vehicles/Vehicle.js');
const Character = require('./Character.js');
const Planet = require('../planets/Planet.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

// GET Character by ID -- show films/homeworld

router.get('/:id', function (req, res) {
    const { id } = req.params;
    // Add a movies property that should be an array of all the movies when the character appeared.
    // Postman test okay. http://localhost:5000/api/characters/5aa995a3b97194b732c167ab
    Character.findById(id)
        .populate('homeworld', 'climate -_id')
        .then(char => {
            Film.find({ characters: id })
                .select('title -_id episode release_date')
                .then(films => {
                    const character = { ...char._doc, movies: films };
                    res.status(200).json(character);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });
    
    // Vehicles

    router
        .route('/:id/vehicles')
        .get(fetchVehicle)
    
    // Gender by height

    router
        .route('/')
        .get(femaletall)

    //Find all female characters taller than 100cm (/api/characters?minheight=100)
    // http://localhost:5000/api/characters?minheight=100 
    
    function femaletall (req, res) {
        const minheight = req.query.minheight;
        let query = Character.find({});
        if (minheight) {
            Character.find({ gender: 'female', height: {$exists: true}, $where: `this.height >= ${minheight}`})
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
        const id = req.params.id;
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
