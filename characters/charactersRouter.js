const express = require('express');

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

//GET by ID
function getid(req, res) {
    const id = req.params.id;

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

module.exports = router;
