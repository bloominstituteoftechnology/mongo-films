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

router.get('/', (req, res) => {
  const minHeightFilter = req.query.minheight
  Character.find({ gender: 'female'})
    .then(characters => {
      characters = characters.filter( characters => {
        return Number(characters.height) > minHeightFilter;
      })
      res.send(characters);
    })
    .catch(err => {
      res.send(err);
    });
});

router
  .route('/:id')
  .get((req, res) => {
    Character.findById(req.params.id)
      .populate('homeworld')
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
