const express = require('express');

const Vehicle = require('./Vehicle.js');

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
    Vehicle
    .findById(id)
    .then(Vehicle=>{
           res.status(202).json(Vehicle);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The Vehicles information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Vehicle
    .findByIdAndRemove(id)
    .then(Vehicle=>{
        res.status(204).end()
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    const options ={
      new:true,
    }
    Vehicle
    .findByIdAndUpdate(id,update, options)
    .then(Vehicle=>{
      res.status(200).json(Vehicle)
        })
  });

function get(req, res) {
  Vehicle.find().then(Vehicles => {
    res.status(200).json(Vehicles);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The Vehicles information could not be retrieved."})
  })
}

function post(req, res) {

  const vehicle = new Vehicle(req.body);

  vehicle
    .save()
    .then(c => {
      res.status(201).json(c);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${vehicle}` });
    });
}
module.exports = router;
