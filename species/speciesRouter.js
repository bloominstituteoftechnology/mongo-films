const express = require('express');

const Specie = require('./Specie.js');

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
    Specie
    .findById(id)
    .then(Specie=>{
           res.status(202).json(Specie);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Species information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Specie
    .findByIdAndRemove(id)
    .then(Specie=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Specie
    .findByIdAndUpdate(id,update, options)
    .then(Specie=>{
      res.status(200).json(Specie)
        })
  });

function get(req, res) {
  Specie.find().then(Species => {
    res.status(200).json(Species);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The Species information could not be retrieved."})
  })
}

function post(req, res) {

  const specie = new Specie(req.body);

  specie
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${specie}` });
    });
}

module.exports = router;
