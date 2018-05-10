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
    let query = Film.find()
        .select('episode producer title director release_date')
        .populate('planets', 'name climate terrain gravity diameter')
        .populate(
            'characters',
            'name gender height skin_color hair_color eye_color'
        )
    const { producer, released } = req.query;

    if (producer) {
        const filter = new RegExp(producer, 'i');
        query.where({ producer: filter });
    }

    if (released) {
        query.where({ release_date: { $regex: released, $options: 'i' } });
    }

    query.then(films => res.status(200).json(films));

    // Film
    //     .find()
    //     .populate('starships', 'starship_class -_id')
    //     .populate('vehicles', 'vehicle_class -_id')
    //     .populate('planets', 'climate name -_id')
    //     .populate('characters', 'name gender birth_year -_id')
    //     .populate('species', 'name classification language -_id')
    //     .then(film => {
    //         res.status(200).json(film);
    //     });
}

function getById(req, res) {
    const { id } = req.params;

    Film
        .findById(id)
        .populate('starships', 'starship_class -_id')
        .populate('vehicles', 'vehicle_class -_id')
        .populate('planets', 'climate name -_id')
        .populate('characters', 'name gender birth_year -_id')
        .populate('species', 'name classification language -_id')
        .then(film => {
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
