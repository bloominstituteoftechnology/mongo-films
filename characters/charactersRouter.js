const express = require('express');
const router = express.Router();

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');


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

  router.
    route('/:id/vehicles').get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
          .then(char => {
            Vehicle.find({ pilot_keys: char.key })
              .then(vehicles => {
                res.status(200).json(vehicles);
              })
              .catch(err => {
                res
                  .status(404)
                  .json([
                    {
                      error:
                        "The vehicle information could not be retrieved."
                    }
                  ]);
              });
          })
          .catch(err => {
            res
              .status(500)
              .json([
                {
                  error:
                    "The character information could not be retrieved."
                }
              ]);
          });
    })
  

module.exports = router;
