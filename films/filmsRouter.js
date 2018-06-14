const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        const { producer, release_date } = req.query;
        if (producer) {
            const producerFilter = new RegExp(producer, 'i');
            Film.find({})
                .where('producer')
                .regex(producerFilter)
                .then(films => res.json(films))
                .catch(err => res.status(500).json({ error: "Error fetching films" }))
        } if(release_date) {
            console.log(releasedFilter)
            const releasedFilter = new RegExp(release_date, 'i')
            Film.find({})
                .where('release_date')
                .regex(releasedFilter)
                .then(films => res.json(films))
                .catch(err => res.status(500).json({ error: "Error fetching films" }))
                // I thought using regexp(release, i) helps with query after ? on the route but it didn't work. Howcome using release_date gives us ?released=2005 in the route? 
            } else {
            Film.find({})
                .sort({ episode: 1 })
                // .select('episode') // projection, shows items that i want to show in my object
                .populate('characters', '_id name gender height skin_color hair_color eye_color')
                .populate('planets', 'name climate terrain gravity diameter')
                .then(films => res.json(films))
                .catch(err => res.status(500).json({ error: "Error fetching films" }))
        }
    })
router
    .route('/:id')
    .get((req,res) => {
        const { id } = req.params;
        
    })
// .get((req, res) => {
//     Film.find({})
//         .then(films => res.json(films))
//         .catch(err => res.status(500).json({ error: "Error fetching films" }))
// })

module.exports = router;
