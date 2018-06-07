const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');
const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Planet.find()
      .then(planets => {
        res.json(planets);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .post((req, res) => {
    Planet.create(req.body)
      .then(planet => {
        res.json(planet);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findById(id)
      .then(planet => {
        Character.find({homeworld: id}, {_id: 0, name: 1})
          .then(characters => {
            console.log("Characters By Planet:",characters);
            console.log("Planet id:",id);
            planet.characters = [...characters];
            Specie.find({ homeworld: id }, {_id: 0, name: 1})
              .then(species => {
                console.log("Species By Planet:",species);
                planet.species = [...species];
                res.json(planet);
              })
              .catch(err => {
                planet.species = [{"Could not retrieve species:": err.message}];
                res.status(202).json(planet);
              })
          })
          .catch( err => {
            planet.characters = [{ "Could not retrieve characters:": err.message}];
            res.status(202).json(planet);
          });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findByIdAndUpdate(id, req.body, { new: true})
      .then(planet => {
        res.json(planet);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    //==>
    Planet.findByIdAndRemove(id)
    .then(planet => {
      res.json(planet);
    })
    .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
