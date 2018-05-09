const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get("/", (req, res) => {
    Planet.find().then(planets => {
      res.status(200).json(planets)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The planet information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Planet.findById(id).then(planet => {
      res.status(200).json(planet)
    }).catch(err => {
      res.status(404).json({
        message: "A planet with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const planetData = req.body;
    const planet = new Planet(planetData);
      
    planet.save().then(planet => {
        res.status(200).json({
          message: "Successfuly saved new planet to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the planet to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Planet.findByIdAndRemove(id).then(planet => {
        res.status(200).json({
            message: "planet has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The planet could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Planet.findByIdAndUpdate(id, input).then(planet => {
        res.status(200).json({
            message: "planet has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The planet information could not be modified."
    })
  })
});
module.exports = router;
