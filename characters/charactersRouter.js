const express = require('express');

const Character = require('./Character.js');
const Vehicles = require('../vehicles/Vehicle.js')

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find({})
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })


router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      .populate('homeworld',  'name climate surface_water diameter rotation_period terrain gravity orbital_period ')
      .then(character => {
        res.status(200).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

  router
  .route('/:id/vehicles')
  .get((req, res) => {
    Vehicles.find( {pilots:req.params.id})
      .populate('pilots')
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })

  // router
  // .route('/:id/vehicles')
  // .get((req, res) => {
  //   Character.findById(req.params.id)
  //   .then(vehicleList => {
  //     let key = vehicleList.key;
  //     Vehicles.find({pilot_keys: key})
  //     .then(vehicles => {
  //       res.status(200).json(vehicles);
  //     })
  //     .catch(err => {
  //       res.status(500).json({err: "There was an error getting the vehicles from the database"});
  //     });
  //   })
  //   .catch(error => {
  //     res.status(500).json({err: "There was an error connecting to the database"});
  //   })
  // })

module.exports = router;
