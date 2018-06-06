const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get("/", (req, res) => {
  Character.find()
    .then(characters => {
      res.json(characters);
    })
    .catch(err => res.status(500).json(err))
})

// add endpoints here
router.get("/:id", (req, res) => {
  const { id } = req.params;
    Character.findById(id)
      .then(character => {
        res.json(character);
      })
      .catch(err => res.status(500).json(err))
})

router.get("/:id/vehicles", (req, res) => {
  const { id } = req.params;
  const { vehicleID } = req.body;
  Character.findById(id)
    .then(foundCharacter => {
      foundCharacter.vehicles = [...foundCharacter.vehicles, vehicleID]
      foundCharacter
        .save()
        .then(savedCharacter => res.status(201).json(savedCharacter))
        .catch(err => res.status(500).json({error: err.message}))
    })
})

module.exports = router;
