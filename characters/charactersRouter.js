const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
  .route("/")
  .get((req, res) => {
    Character.find()
      .populate('homeworld')
      .then(characters => {
        res.status(200).json(characters);
      })
      .catch(err => {
        res.status(500).json({
          error: "The character information could not be retrieved."
        });
      });
  })

router.
  route("/:id").get((req,res) => {
      const { id } = req.params;
      Character.findById(id)
        .populate("homeworld")
        .then(characters => {
          res.status(200).json(characters);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: `The character with id# ${id} information could not be retrieved.`
            });
        });
  })
  

module.exports = router;
