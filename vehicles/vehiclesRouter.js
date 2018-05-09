const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get("/", (req, res) => {
    Vehicle.find().then(vehicle => {
      res.status(200).json(vehicle)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The vehicle information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Vehicle.findById(id).then(vehicle => {
      res.status(200).json(vehicle)
    }).catch(err => {
      res.status(404).json({
        message: "A vehicle with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const vehicleData = req.body;
    const vehicle = new Vehicle(vehicleData);
      
    vehicle.save().then(vehicle => {
        res.status(200).json({
          message: "Successfuly saved new vehicle to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the vehicle to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Vehicle.findByIdAndRemove(id).then(vehicle => {
        res.status(200).json({
            message: "vehicle has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The vehicle could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Vehicle.findByIdAndUpdate(id, input).then(vehicle => {
        res.status(200).json({
            message: "vehicle has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The vehicle information could not be modified."
    })
  })
});

module.exports = router;
