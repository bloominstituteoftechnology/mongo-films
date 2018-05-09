const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router
    .route("/:id")
    .get((req, res) => {
      const id = req.params.id
      Character.findById(id)
      .then(character => {
            res.status(200).json(character);
      })
      .catch(error => {
        res.status(500).json("Error finding that character");
      })
    })

module.exports = router;
