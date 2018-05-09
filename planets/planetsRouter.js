const express = require('express');
const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Character.find({ homeworld: id })
    .select('name homeworld')
    .then(specie => {
      Specie.find({ })
      .select('name homeworld').where({ homeworld: id })
      res.status(200).json(specie)
    })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'There was an error while retrieving the vehicles from the database.' });
      });
  });
/*router
    .route("/")
    .get((req, res) => {
        Planet.find({})
            .then(item => {
                console.log("Get Request From " + req.connection.remoteAddress + " at: "
                    + (time = new Date()));
                res.status(200).json(item);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    })
    */
module.exports = router;
