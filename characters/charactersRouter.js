const express = require('express');

const Character = require('./Character.js');
const Vehicles = require('../vehicles/Vehicle.js');
const Films = require('../films/Film.js');

const router = express.Router();

// add endpoints here
// router
//   .route('/')
//   .get((req, res) => {
//     Character.find({})
//       .then(characters => {
//         res.status(200).json(characters);
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   })
router
  .route('/')
  .get((req, res) => {
    //console.log(regex);
    const minHeightFilter = req.query.gender;
    const query = Character.find({})
    .sort('gender')
    .where({gender: minHeightFilter})
      query.then(characters => {
        res.status(200).json(characters);
        console.log(query.females);
      })
      .catch(err => {
        res.status(500).json(err);
        console.log(err);
      });
})

router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      .populate('homeworld',  'name climate surface_water diameter rotation_period terrain gravity orbital_period ')
      Films.find({characters: id})
      .populate('movies')
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
      .populate('pilots',{name:1, _id:0})
      .then(vehicles => {
        res.status(200).json(vehicles);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })


module.exports = router;
