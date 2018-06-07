const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here


router
    .route('/')
    .get((req, res) => {
        const { producer, released } = req.query;
        const { id } = req.params;
        let query = Film.find()
            .sort('episode') //order by episode
            .select('episode title producer homeworld release_date')
            if(producer !== undefined){
                const filter = new RegExp(producer, 'i' )
                query.where({producer: filter})
            }
            if(released !== undefined){
                query.where({release_date: {$regex: released, $options: 'i'}})
            }
            query.then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })


router  
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
            .populate('planets', 'name climate terrain gravity diameter -_id')
            .populate('characters', 'name gender height skin_color hair_color eye_color -_id')
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')
                .then(resource => {
                    res.status(201).json(resource)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err)
                })
    })


module.exports = router;
