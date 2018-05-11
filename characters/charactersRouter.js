const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js')
const Vehicle = require('../vehicles/Vehicle.js')

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
  const id = req.params.id;

  let query = Character.findById(id).populate("homeworld").select('name gender height')

  query.then(char => {
    Film.find({characters: id}).select('title -_id').then(films => {
      console.log(films)
      const character = {
        ...char._doc,
        movies: films
      }
      res.json(character)
    })
  }).catch(err => {
    res.json(err)
  })
})

router.get('/:id/vehicles', (req, res) => {
  const id = req.params.id;
  // console.log('only id',id)
  let query = Character.findById(id)

  query.then(char => {
    Vehicle.find().where({pilots: id}).select('vehicle_class').then(vehicle => {
      res.json(vehicle)
    })
  }).catch(err => {
    res.json(err)
  })
})

router.get('/', (req, res) => {
  const {minheight} = req.query;
  Character.find().select('gender height name').where('height').gt(Number(minheight)).where({gender: 'female'}).then(female => res.send(female)).catch(err => console.log(err))
})

module.exports = router;
