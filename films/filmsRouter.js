const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;
        const { release_date } = req.query;
        if(producer) {
            const producerFilter = new RegExp(producer, 'i')
            Film
                .find({})
                // .find({producer: { $regex: producer, $options: 'i'} })
                .where('producer')
                .regex(producerFilter)
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        } else if(release_date) {
            const releaseFilter = new RegExp(release_date, 'i')
            Film
                .find({})
                .where('release_date')
                .regex(releaseFilter)
                .then(response => {
                    res.status(200).json({ status: "LOOK HERE", response})
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        } else {
            Film
                .find({})  
                .sort('episode')
                //.select('episode title director producer release_date')  
                .populate('characters','_id name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        }
    })
    

module.exports = router;
