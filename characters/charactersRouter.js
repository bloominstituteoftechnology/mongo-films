const express = require('express');
const Film = require('../films/Film.js');
const Vehicles = require('../vehicles/Vehicle.js');
const Character = require('./Character.js');

const router = express.Router();

// add endpoints hererouter
router
  .route('/')
  .get((req, res) => {
    let search = {}
    const size = Object.keys(req.query).length;
    const queryValue = req.query.minheight;
    const genderValue = req.query.gender;

    if(size > 0){
      search = {height: {$gt:queryValue}, gender:`${genderValue}`};
      console.log("search if",search)
    }
    console.log("search else",search)
    // console.log(search)
    Character.find(search)
      .populate('homeworld', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld', 'name climate terrain gravity diameter')// { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
      .then(foundCharacter => {
        Film
        .find({ character_ids: foundCharacter.key}, '-_id title')
        .then(foundFilm => {
          console.log()
          foundCharacter.movies = [...foundFilm]
          res.json(foundCharacter)
        })
      })
      .catch(err => res.status(500).json({ error: err }));
    });

router
  .route('/:id/vehicles')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld', 'name climate terrain gravity diameter')// { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
      .then(foundCharacter => {
        Vehicles
        .find({ pilot_keys: foundCharacter.key}, 'vehicle_class -_id')
        .then(foundFilm => {
          console.log(foundFilm)
          foundCharacter.vehicles = [...foundFilm]
          res.json(foundCharacter)
        })
      })
      .catch(err => res.status(500).json({ error: err }));
    });

module.exports = router;
