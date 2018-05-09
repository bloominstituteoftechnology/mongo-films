const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Character.findById(id)
    .populate('homeworld')
    // .exec(function (err, character) {
    //     if (err) res.status(500).json({ error: 'There was an error while retrieving the character from the database.' });
    //     res.status(200).json(character);
    // });
    .then(char => {
        Film.find({ characters: id })
        .select('title producer director episode release_date')
        .then(films => {
            const character = { ...char._doc, movies: films };
            res.send(character);
        });
    });
});

router.get('/:id/vehicles', function(req, res) {
    // test id: 5aa995a3b97194b732c167ab
    Vehicle.find({ pilots: req.params.id }
        // , function (err, docs) {
        // console.log(docs);}
    )
    .select('vehicle_class')
    .populate('pilots', 'name')
    .then(vehicles => res.send(vehicles));
  });

module.exports = router;