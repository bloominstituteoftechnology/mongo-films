const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;
        const { release_date } = req.query;
        if(producer){
            const prodFilter = new RegExp(producer, 'i')
            Film
                .find({})
                .where('producer')
                .regex(prodFilter)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(err => {
                    res.status(500).json({ error: err.message })
                })
        } else if(release_date){
            const releaseFilter = new RegExp(release_date, 'i')
            Film
                .find({})
                .where('release_date')
                .regex(releaseFilter)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(err => {
                    res.status(500).json({ error: err.message })
                })
        } 
        else {
           Film
            .find()
            .sort('episode')
            .populate('characters', 'name gender height skin_color hair_color eye_color')
            .populate('planets', '-_id name climate terrain gravity diameter')
            .then(films => {
                res.status(200).json(films);
            })
            .catch(err => {
                res.status(500).json({ error: "The film information could not be retrieved" })
            }) 
        }
    })

module.exports = router;
