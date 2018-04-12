const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route("/")
    .get((req, res) => {

        const { producer, release_date } = req.query;

        const queryByProducer = Film.find({})
            .sort('episode')
            .populate('characters', 'name gender height skin_color hair_color eye_color')
            .populate('planets', 'name climate terrain gravity diameter')

        const queryByDate = Film.find({})
            .sort('episode')
            .populate('characters', 'name gender height skin_color hair_color eye_color')
            .populate('planets', 'name climate terrain gravity diameter')

        if (producer) {
            const person = new RegExp(producer, 'i');
            console.log("Finding movies with producer " + producer + ".")
            queryByProducer.where({ producer: person });

            Promise.all([queryByProducer])
                .then(films => {
                    res.status(200).json(films);
                })
            return;
        }

        if (release_date) {
            const date = new RegExp(release_date)
            console.log("Finding movies with release date of " + date + ".")
            queryByDate.where({ release_date: date });

            Promise.all([queryByDate])
                .then(films => {
                    res.status(200).json(films);
                })
            return;
        }
        else {
            console.log("Finding all movies.");
            Film.find({})
                .sort('episode')
                .populate('characters', 'name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .then(item => {
                    res.status(200).json(item)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err);
                })
            return;
        }
    });

module.exports = router;
