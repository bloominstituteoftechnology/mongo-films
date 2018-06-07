const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;
        if (producer) {
            Flim.find({ producer: { $regex: producer, $options: 'i' } })
                .then(films => res.json(films))
                .catch(error => res.status(500).json({ error: error.message }))
        } else {
            Film.find({})
                .sort('episode')
                .select('episode title director producer')
                .populate(
                    'characters',
                    '_id name gender height skin_color hair_color eye_color'
                )
                .populate('planets name climate terrain gravity diameter')
                .then(films => res.json(films))
                .catch(error => res.status(500).json({ error: error.message }));
        }
    });

router
    .route('/')
    .get((req, res) => {
        const { producer } = req.query;
        if (producer) {
            const producerFilter = new RegExp(producer, 'i');
            Film.find({})
                .where('producer')
                .regex(producerFilter)
                .then(films => res.json(films))
                .catch(error => res.status(500).json({ error: error.message }));
        } else {
            Film.find({})
                .sort('episode')
                .populate('character',
                    '_id name gender height skin_color hair_color eye_color'
                )
                .popualte('planet', 'name climate terrain diameter')
                .then(films => res.json(films))
                .catch(error => res.status(500).json({ erroe: error.message }))
        }
    })


module.exports = router;
