const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.get("/", (req, res) => {
    Starship.find().then(starship => {
      res.status(200).json(starship)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The starship information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Starship.findById(id).then(starship => {
      res.status(200).json(starship)
    }).catch(err => {
      res.status(404).json({
        message: "A starship with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const starshipData = req.body;
    const starship = new Starship(starshipData);
      
    starship.save().then(starship => {
        res.status(200).json({
          message: "Successfuly saved new starship to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the starship to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Starship.findByIdAndRemove(id).then(starship => {
        res.status(200).json({
            message: "starship has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The starship could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Starship.findByIdAndUpdate(id, input).then(starship => {
        res.status(200).json({
            message: "starship has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The starship information could not be modified."
    })
  })
});

module.exports = router;
