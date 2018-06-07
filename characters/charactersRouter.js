const express = require('express');
const router = express.Router();

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Film = require("../films/Film.js");



// add endpoints here

router
  .route("/")
  .get((req, res) => {
    if(req.query.minheight) {
        Character.find({ height: { $gte: Number(req.query.minheight) }, gender: "female" })
          .select("name gender height skin_color hair_color eye_color")
          .populate("homeworld")
          .then(characters => {
            res.status(200).json(characters);
          })
          .catch(err => {
            res
              .status(500)
              .json({
                error:
                  "The character information could not be retrieved."
              });
          });
    } else {
        Character.find()
          .select("name gender height skin_color hair_color eye_color")
          .populate("homeworld")
          .then(characters => {
            res.status(200).json(characters);
          })
          .catch(err => {
            res
              .status(500)
              .json({
                error:
                  "The character information could not be retrieved."
              });
          });
    }
  })

router.
  route("/:id").get((req,res) => {
      const { id } = req.params;
      Character.findById(id)
        .populate("homeworld")
        .then(char => {
            Film.find({ characters: id })
            .select('title -_id')
            .then(films => {
                const character = {...char._doc, movies: films}
                res.status(200).json(character);
            })
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
            .select('vehicle_class')
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
