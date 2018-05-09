const express = require('express');

const Starship = require('./Starship.js');

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
    Starship.find().then(starship => {
        res.status(200).json(starship);
    });
}

function post(req, res) {
    const starshipInfo = req.body;

    const starship = new Starship(starshipInfo)

    starship
        .save()
        .then(starship => {
            Starship.find().then(starship => {
                res.status(200).json(starship);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Starship
        .findById(id)
        .then(starship => {
        res.status(200).json(starship);
    });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Starship
        .findByIdAndUpdate(id, update)
        .then(starship => {
            Starship.find().then(starship => {
                res.status(200).json(starship);
            });
    });
}

function destroy(req, res) {
    const { id } = req.params;
    
    Starship
        .findByIdAndRemove(id)
        .then(starship => {
            Starship.find().then(starship => {
                res.status(200).json(starship);
            });
    });
}

module.exports = router;
