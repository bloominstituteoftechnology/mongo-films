const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();
//--General Get---------------------------------------------------------------

router.get('/', function(req, res) {
    Character
    .find()
    .then(chars => res.status(200).json(chars))
    .catch(err => {
      res.status(500).json(err);
    });
});

//--find character by ID-------------------------------------------------------

router.get('/:id', function(req, res) {
    const { id } = req.params;
    let query = Character.findById(id);
    query
    .select('name')
    .populate('homeworld', 'name')
    .populate('movies', 'title')
    .then(info => res.status(200).json(info))
    .catch(err => {
        res.status(500).json(err);
    })
})

//--find vehicles of a character------------------------------------------------
// (/api/characters/:id/vehicles)

+router.get('/:id/vehicles', function(req, res, next) {
    Vehicle
        .find({ pilots: req.params.id })
        .populate('pilots', 'name')
        .select('vehicle_class')
        .then(vehicles => res.send(vehicles))
        .catch(err => next(err))
})

//--find female character of specified parameters------------------------------
// (/api/characters?minheight=100)
+router.get('/', function(req, res, next) {
    const { minheight } = req.query;
    Character
        .find({ gender: 'female', height: { $gt: minheight }})
        .then(FemaleHeightDes => res.send(FemaleHeightDes))
        .catch(err => next(err))
});

module.exports = router;
