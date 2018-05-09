const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getById)
    .put(put)
    .delete(destroy)
    
function get(req, res) {
    Character.find().then(character => {
        res.status(200).json(character);
    });
}

function post(req, res) {
    const characterInfo = req.body;

    const character = new Character(characterInfo)

    character
        .save()
        .then(character => {
            Character.find().then(character => {
                res.status(200).json(character);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Character
        .findById(id)
        .then(character => {
        res.status(200).json(character);
    });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Character
        .findByIdAndUpdate(id, update)
        .then(character => {
            Character.find().then(character => {
                res.status(200).json(character);
            });
    });
}

function destroy(req, res) {
    const { id } = req.params;
    
    Character
        .findByIdAndRemove(id)
        .then(character => {
            Character.find().then(character => {
                res.status(200).json(character);
            });
    });
}

module.exports = router;
