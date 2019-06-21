const express = require('express');

const Starship = require('./Starship.js');

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
    Starship
    .findById(id)
    .then(Starship=>{
           res.status(202).json(Starship);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Starships information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Starship
    .findByIdAndRemove(id)
    .then(Starship=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Starship
    .findByIdAndUpdate(id,update, options)
    .then(Starship=>{
      res.status(200).json(Starship)
        })
  });

function get(req, res) {
  Starship.find().then(Starships => {
    res.status(200).json(Starships);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The Starships information could not be retrieved."})
  })
}

function post(req, res) {

  const starship = new Starship(req.body);

  starship
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${Starship}` });
    });
}
module.exports = router;
