const express = require('express');

const Character = require('./Character.js');

const router = express.Router();
  
  router.get("/", (req, res, next) => {
    Character.find().then(characters => {
      res.status(200).json(characters)
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The character information could not be retrieved."})
    })
  })
  
  router.get("/:id", (req, res) => {
    const id = req.params.id
    Character.findById(id).populate("homeworld").then(character => {
      res.status(200).json(character)
    }).catch(err => {
      res.status(404).json({
        message: "A character with that id could not be found"
      })
    })
  })

  
  router.post("/", (req, res) => {
    const characterData = req.body;
    const character = new Character(characterData);
      
    character.save().then(character => {
        res.status(200).json({
          message: "Successfuly saved new character to database"
        })
      }).catch(err => {
        res.status(500).json({
          errorMessage: "There was an error while saving the character to the database."
        })
      })
  })
  
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id

    Character.findByIdAndRemove(id).then(character => {
        res.status(200).json({
            message: "Character has been deleted from the database"
        })
    }).catch(err => {
      res.status(500).json({
        errorMessage: "The character could not be removed"
        })
    })
})
  
  
  router.put("/:id", (req, res)=> {
    const id = req.params.id;
    const input = req.body;
  
    Character.findByIdAndUpdate(id, input).then(character => {
        res.status(200).json({
            message: "Character has been succesfully updated"
          })
        }).catch(err => {
            res.status(500).json({
      errorMessage: "The character information could not be modified."
    })
  })
});





module.exports = router;
