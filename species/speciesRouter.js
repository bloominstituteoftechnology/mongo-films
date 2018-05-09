const express = require('express');

const Specie = require('./Specie.js');

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
    Specie.find().then(specie => {
        res.status(200).json(specie);
    });
}

function post(req, res) {
    const specieInfo = req.body;

    const specie = new Specie(specieInfo)

    specie
        .save()
        .then(specie => {
            Specie.find().then(specie => {
                res.status(200).json(specie);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Specie
        .findById(id)
        .then(specie => {
        res.status(200).json(specie);
    });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Specie
        .findByIdAndUpdate(id, update)
        .then(specie => {
            Specie.find().then(specie => {
                res.status(200).json(specie);
            });
    });
}

function destroy(req, res) {
    const { id } = req.params;
    
    Specie
        .findByIdAndRemove(id)
        .then(specie => {
            Specie.find().then(specie => {
                res.status(200).json(specie);
            });
    });
}

module.exports = router;
