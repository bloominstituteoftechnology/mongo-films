const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        let query = Character.find()
        .select('name gender height skin_color hair_color eye_color -_id')
        const { minheight } = req.query;
        console.log(typeof minheight)
        if (minheight) {
            console.log("type of data", typeof minheight, "actual value", minheight);
            var x = parseInt(minheight)
            console.log("type of data", typeof x, "actual value", x);
            query.where({ height: { $gte: x } } )
        }
        query.then(resource => {
            res.status(201).json(resource)
        })
            .catch(err => {
                res.status(500).json(err)
            })
    })


router
    .route('/movies/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('homeworld', 'name climate terrain gravity diameter -_id')
            .then(char => {
                Film.find({ characters: id }).select('title').then( films => {
                    const character = {...char._doc, movies: films}
                    res.status(201).json(character)
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .populate('starships', 'pilots starship_class hyperdrive_rating  -_id')
            .populate('vehicles', 'vehicle_class pilot_keys pilot  -_id')

            .then(resource => {
                res.status(200).json({ resource })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })



module.exports = router;
