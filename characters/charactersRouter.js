const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle');
const Film = require('../films/Film');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    // console.log(req.query.minheight)
    if (req.query.minheight) {
      Character.find({
          height: {
            $get: Number(req.query.minheight)
          },
          gender: 'female'
        })
        .select('name gender height skin_color hair_color eye_color')
        .populate('homeworld')
        .then(chars => {
          res.status(200).json(chars);
        })
        .catch(err => {
          res.status(500).json([{
            error: "The character information could not be retrieved."
          }]);
        })
    } else {
      Character.find()
        .select('name gender height skin_color hair_color eye_color')
        .populate('homeworld')
        .then(chars => {
          res.status(200).json(chars);
        })
        .catch(err => {
          res.status(500).json([{
            error: "The character information could not be retrieved."
          }]);
        })
    };
  });
router
  .route('/:id')
  .get((req, res) => {
    const {
      id
    } = req.params;
    Character.findById(id)
      .populate('homeworld')
      .then(character => {
        res.json(character)
      })
      .catch(err => {
        res.json(err)
      })
  })

router
  .route('/:id/vehicles').get((req, res) => {
    const {
      id
    } = req.params;
    Character.findById(id)
      .then(char => {
        Vehicle.find({
            pilot_keys: char.key
          })
          .select('vehicle_class')
          .then(vehicles => {
            res.status(200).json(vehicles);
          })
          .catch(err => {
            res.status(404).json([{
              error: "The vehicle information could not be retrieved."
            }]);
          });
      })
      .catch(err => {
        res.status(500).json([{
          error: "The character information could not be retrieved."
        }]);
      });
  });


module.exports = router;