const express = require('express');
const Vehicle = require('../vehicles/Vehicle.js');
const Character = require('./Character.js');
const Planet = require('../planets/Planet.js');
const Film = require('../films/Film');

const router = express.Router();

//GET ALL CHARACTERS - http://localhost:5000/api/characters
router.get('/', function(req, res) {
    Character.find()
    .then(chars => res.status(200).json(chars))
    .catch(err => {
        res.status(500).json(err);
    });
});

//GET Character by ID - show films/homeworld
router.get('/:id', function(req, res) {
    const { id } = req.params;
    //add a movies property that should be an array of all the movies where the character appeared.
    //Postman Test ok! http://localhost:5000/api/characters/5aa995a3b97194b732c167ab 
    //(Luke Skywalker data/homeworld/films)
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
    .catch(err => {
        res.status(500).json(err);
    });
});


//-----------------------------------
// add endpoints here
//-----------------------------------

//gender by height
router
    .route('/')
    .get(femaletall)

//vehicles
router
    .route('/:id/vehicles')
    .get(fetchvehicle)

//Find all female characters taller than 100cm (/api/characters?minheight=100)
//Postman GET Test ok! http://localhost:5000/api/characters?minheight=100 
function femaletall(req, res) {
    const minheight = req.query.minheight;
    let query = Character.find();
    if(Character.height > 100) {
        query.where({height: minheight});
    }
    Character.find({gender: 'female'}).sort('height').select('name')
    .then(friends => {
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Info Not Found.' })
    });
}

//Find all vehicles driven by a given character. (/api/characters/:id/vehicles)
//Postman GET Test ok! http://localhost:5000/api/characters/5aa995a3b97194b732c167b8/vehicles (Showing vehiles piloted by Princess Leia)
function fetchvehicle(req, res) {
    const id = req.params.id;
    Character
    .findById(id)
    .then(character => {
        let key = character.key;
    Vehicle.find({ pilot_keys: key })
    .then(character => {
        res.status(200).json(character);
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Char info not found.' })
    })
    .catch(err => {
        res.status(404).json(err);
    })
})
}

module.exports = router;



//OTHER SYNTAX

// router
//     .route('/:id')
//     .get(getid)

//GET by ID - Given a character id, (/api/characters/:id)
//Postman GET test ok! http://localhost:5000/api/characters/5aa995a3b97194b732c167b8 (showing Princess Leia by ID)
// function getid(req, res) {
//     const id = req.params.id;
//     const query = Character.findById(id);
//     //populate the character's homeworld.
//     query.populate('homeworld');

//     query
//     .then(character => {
//         if (character.length === 0) {
//             res.status(404).json({ errorMsg: 'Character ID does not exist.' })
//         }
//         res.status(200).json(character);
//     })
//     .catch(err => {
//         res.status(500).json({ errorMsg: 'Character Info Not Found.' })
//     });
// }