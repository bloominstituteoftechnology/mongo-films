const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle')
const Film = require('../films/Film.js');
const router = express.Router();

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;

  let query = Character.findById(id).populate('homeworld');

  query.then(char => {
    Film.find({ characters: id })
      .select({ title: 1, _id: 0 })
      .then(films => {
        const character = { ...char._doc, movies: films };
        res.status(200).json(character);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
    
  })
  .delete((req, res) => {
    const {id} = req.params
    Character
    .findByIdAndRemove(id)
    .then(Character=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Character
    .findByIdAndUpdate(id,update, options)
    .then(Character=>{
      res.status(200).json(Character)
        })
  });

function get(req, res) {
  const { minheight } = req.query;

  let query = Character.find({})

  

  if (minheight) {
    query
      .where({ gender: 'female' })
      .where('height')
      .gte(Number(minheight));
  }

  query
    .then(chars => {
 
      res.status(200).json(chars);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function post(req, res) {

  const character = new Character(req.body);
  console.log(character)
  character
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err });
    });
}
router.route('/:id/vehicles')
.get((req, res) => {
  const { id } = req.params;

  Vehicle.find({ pilots: id })
    .select({ vehicle_class: 1, _id: 0 })
    .then(vehicles => {
      res.status(200).json(vehicles);
    });
})

module.exports = router;
