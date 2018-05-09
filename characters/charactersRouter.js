const express = require('express');
const Vehicle = require('../vehicles/Vehicle.js');
const Character = require('./Character.js');
const router = express.Router();

// add endpoints here
router
    .route('/:id')
    .get(getid)

//gender by height
router
    .route('/')
    .get(femaletall)

//vehicles
router
    .route('/:id/vehicles')
    .get(fetchvehicle)


//GET by ID - Given a character id, (/api/characters/:id)
function getid(req, res) {
    const id = req.params.id;
    const query = Character.findById(id);
    // query.populate('Homeworld', 'name');

    Character
    .findById(id)
    .then(character => {
        if (character.length === 0) {
            res.status(404).json({ errorMsg: 'Character ID does not exist.' })
        }
        res.status(200).json(character);
    })
    .catch(err => {
        res.status(500).json({ errorMsg: 'Character Info Not Found.' })
    });
}

//Find all female characters taller than 100cm (/api/characters?minheight=100)
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
