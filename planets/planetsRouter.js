const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');
const router = express.Router();

// add endpoints here
router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
    .get((req, res) => {
        const {id} = req.params
        
        const chars = Character.find({homworld: id})
        const species = Specie.find({homworld: id})

        promise.all([chars, species]).then(resaults=>{
          const [characters,species] = resaults

          res.status(200).json({character, species})
        }).catch(err=>{
res.send(err)
        })
        


    Planet
    .findById(id)
    .then(Planet=>{
           res.status(202).json(Planet);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Planets information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Planet
    .findByIdAndRemove(id)
    .then(Planet=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Planet
    .findByIdAndUpdate(id,update, options)
    .then(Planet=>{
      res.status(200).json(Planet)
        })
  });

function get(req, res) {
  Planet.find().then(Planets => {
    res.status(200).json(Planets);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The Planets information could not be retrieved."})
  })
}

function post(req, res) {

  const planet = new Planet(req.body);
console.log(planet)
  planet
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${planet}` });
    });
}

module.exports = router;
