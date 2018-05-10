const express = require('express');
const Character = require('./Character.js'); // model/collection
const Planet = require('../planets/Planet');
const Film = require('../films/Film');
const Specie = require('../species/Specie');
const Vehicle = require('../vehicles/Vehicle');
const router = express.Router();

router.route('/').get((req, res) => {
  const { minheight } = req.query;

  if (minheight) {
    Character.find({gender: 'female', height: {$exists: true}, $where: `this.height >= ${minheight}`})
      .then(chars => res.status(200).json(chars))
      .catch(err => res.status(500).json("Error."))
  } else {
    Character.find()
      .then(chars => res.json(chars))
      .catch(err => res.json("Error fetching characters."))
  }
});

// get character by id and add the films they appeared in
router.route('/:id').get((req, res) => {
  const { id } = req.params;

  Character
    .findById(id)
    .populate('homeworld')
    .then(char => {
      Film
        .find({ characters: id })
        .select('title')
        .then(films => {
          const character = { ...char._doc, movies: films };
          res.status(200).json(character);
        })
        .catch(err => res.status(500).json("Something went wrong."))
    });
});

// get character by id and show the vehicles associated with them
router.route('/:id/vehicles').get((req, res) => {
  const { id } = req.params;

  Character.findById(id)
    .then(char => {
      Vehicle
        .find({ pilots: id })
        .select('vehicle_class')
        .then(vehicles => res.json(vehicles))
        .catch(err => res.json(err))
    })
    .catch(err => res.status(500).json({ error: "The provided character ID does not exist." }))
})
    
module.exports = router;


    
/* 
query.populate(
  specify the property within the model that you want to populate - must have a ref and ObjectID
  , optional: specify the specific fields from the ref that you wish to populate with
) 

const findCharacter = Character.find({ homeworld: id }).select('name');
const findSpecie = Specie.find({ homeworld: id }).select('name');

Promise.all([findCharacter])
  .then(response => res.send({ characters: response[0] }))
  .catch(err => res.json("Something went wrong."))
*/