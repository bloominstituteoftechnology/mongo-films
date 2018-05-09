const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router.get("/", (req, res) => {
    Specie.find().then(species => {
      res.status(200).json(species)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The specia information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Specie.findById(id).then(speice => {
      res.status(200).json(speice)
    }).catch(err => {
      res.status(404).json({
        message: "A speice with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const specieData = req.body;
    const specie = new Specie(specieData);
      
    specie.save().then(specie => {
        res.status(200).json({
          message: "Successfuly saved new specie to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the specie to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Specie.findByIdAndRemove(id).then(specie => {
        res.status(200).json({
            message: "specie has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The specie could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Specie.findByIdAndUpdate(id, input).then(specie => {
        res.status(200).json({
            message: "specie has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The specie information could not be modified."
    })
  })
});

module.exports = router;
