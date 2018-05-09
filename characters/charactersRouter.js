const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
    .get((req, res) => {
        const {id} = req.params
    Character
    .findById(id)
    .then(Character=>{
           res.status(202).json(Character);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Characters information could not be retrieved."})
    })
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
  Character.find().then(Characters => {
    res.status(200).json(Characters);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The Characters information could not be retrieved."})
  })
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
      res.status(500).json({ errorMessage: `${character}` });
    });
}

module.exports = router;
