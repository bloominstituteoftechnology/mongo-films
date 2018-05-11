const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/', function (req, res) {

    Character
        .find()
        .then(chars => res.status(200).json(chars))
        .catch(err => {
            res.status(500).json(err);
        });

    const minheight = req.query.height;

    const query = Character
        .find({ gender: 'female' });

    if (minheight) {
        const minfilter = new RegExp(minheight, 'i');
        query.where({ minheight: minfilter })
    }

    query
        .then(chars => 
            res.status(200).json(chars)
        )
        .catch(err => 
            res.status(500).json(err)
        );

});

router.get('/:id', function(req, res) {
    const { id } = req.params;

    Character
        .findById(id)
        .populate('homeworld', 'name terrain climate -_id')
        .then(char => {
            Film.find({ characters: id })
                .select('title')
                .then(films => {
                    const character = { ...char._doc, movies: films };
                    res.status(200).json(character);  
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id/vehicles', (req, res) => {
    const { id } = req.params;

    Character
        .findById(id)
        .then(char => {
            Vehicle
                .find({ pilots: id })
                .select('vehicle_class')
                .then(vehicles => res.status(200).json(vehicles))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});

// router.get('/', (req, res) => {
//     const minheight = req.query.minheight;

//     const query = Character
//         .find({ gender: 'female' });

//     if (minheight) {
//         const minfilter = new RegExp(minheight, 'i');
//         query.where({ minheight: minfilter })
//     }

//     query
//         .then(chars => 
//             res.status(200).json(chars)
//         )
//         .catch(err => 
//             res.status(500).json(err)
//         );
// });

module.exports = router;
