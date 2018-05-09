const express = require('express');

const Film = require('./Film.js');

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
    Film.find().then(film => {
        res.status(200).json(film);
    });
}

function post(req, res) {
    const filmInfo = req.body;

    const film = new Film(filmInfo)

    film
        .save()
        .then(film => {
            Film.find().then(film => {
                res.status(200).json(film);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getById(req, res) {
    const { id } = req.params;

    Film
        .findById(id)
        .then(film => {
        res.status(200).json(film);
    });
}

function put(req, res) {
    const { id } = req.params;
    const update = req.body;

    Film
        .findByIdAndUpdate(id, update)
        .then(film => {
            Film.find().then(film => {
                res.status(200).json(film);
            });
    });
}

function destroy(req, res) {
    const { id } = req.params;
    
    Film
        .findByIdAndRemove(id)
        .then(film => {
            Film.find().then(film => {
                res.status(200).json(film);
            });
    });
}

module.exports = router;
