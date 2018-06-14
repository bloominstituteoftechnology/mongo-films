const express = require('express');

const Character = require('./Character.js');

const Vehicle = require('../vehicles/Vehicle.js');

const Film = require('../films/Film.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
  let { minheight } = req.query;
  minheight = Number(minheight);

    if (minheight) {
      Character
      .find()
      .where('gender').equals('female')
      .where('height').gt(minheight)
      .then(characters => {
        res.json({ characters });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching characters height.' }));
    }
    else {
      Character
     .find()
      .then(characters => {
        res.json({ characters });
      })
      .catch(err => {
        res.status(500)
        res.json({ message: "Error fetching characters."})
      })
    }
  })


router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params; 

    Character
    .findById(id)
    .populate('homeworld')
    .populate('movies')
    .then(character => {
        res.status(200)
        res.json({ character })
    })
    Film // Couldn't get this one to work :/
    .find(id)
    .where('characters')
    .then(movies => {
      res.json({ character, movies })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The character information could not be retrieved." })
    })
  })
  
router 
  .route('/:id/vehicles')
  .get((req, res) => {

  Vehicle
  .find()
  .where('pilots').in([req.params.id])
  .then((vehicles) => {
    res.json({ vehicles });
  })
  .catch(error => {
    res.status(500).json({ error: 'Error fetching vehicles' })
  })
})



module.exports = router;
