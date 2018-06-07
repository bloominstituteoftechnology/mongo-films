const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        const { producer, release_date } = req.query;

        if(producer) {
            const producerFilter = new RegExp(producer, 'i'); // build a case-insensitive match around the producer name
            Film.find() // look at all documents in collection
                .where('producer') // find where producer matches the following regex pattern
                .regex(producerFilter) // pass our regex pattern to the regex func
                .populate('characters', ('name gender height skin_color hair_color eye_color'))
                .populate('planets', ('name climate terrain gravity diameter -_id'))
                .sort('episode')
                .then(films => res.json(films))
                .catch(err => res.status(500).json({ error: err.message }))
        
        } else if (release_date) {
            const releaseDateFilter = new RegExp(release_date, 'i'); 
            Film.find() 
                .where('release_date') 
                .regex(releaseDateFilter) 
                .populate('characters', ('name gender height skin_color hair_color eye_color'))
                .populate('planets', ('name climate terrain gravity diameter -_id'))
                .sort('episode')
                .then(films => res.json(films))
                .catch(err => res.status(500).json({ error: err.message }))

        } else {
            Film.find()
            .populate('characters', ('name gender height skin_color hair_color eye_color'))
            .populate('planets', ('name climate terrain gravity diameter -_id'))
            .sort('episode')
            .then(films => res.json(films))
            .catch(err => res.status(500).json({ error: err.message}));
        }
    })

    

router  
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
        .populate('characters', ('name gender height skin_color hair_color eye_color'))
        .populate('planets', ('name climate terrain gravity diameter -_id'))
            .then(film => res.json(film))
            .catch(err => res.status(500).json({ error: err.message}));
    })


module.exports = router;
