const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Starship = require('../starships/Starship.js');


const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
      const { minheight } = req.query;

      let characterQuery = Character.find();

      if(minheight){
        characterQuery
          .where('height').gt(minheight)
          .where('gender').equals('female')
      }

      characterQuery
        .populate('homeworld', '-_id name')
        .then(foundCharacters => 
            res.json(foundCharacters)
        )
        .catch(err =>
          res.status(500).json({ error: 'Error reading the DB' })
        );
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Character.findById(id)
          .select('-_id -vehicles -key -__v -edited -created -homeworld_key')
            .populate('homeworld', '-_id name')
            .then(foundCharacter => {
                let data = foundCharacter
                if(foundCharacter) {
                  Film
                    .find()
                    .where('characters').equals(id)
                    .select('-_id title')
                    .then(movies => {
                      if(movies) {
                        data.movies = movies
                        res.json( data )
                      } else {
                        res.status(404).json( { error: 'Movie not found' } )
                      }
                    })
                } else {
                  res.status(404).json( { error: 'Character not found' } )
                }
            })
            .catch(err =>
              res.status(500).json({ error: 'Error reading the DB' })
            );
    })


    router
    .route('/:id/vehicles')
    .get((req, res) => {
      const { id } = req.params
      Vehicle
        .find()
        .where('pilots').equals(id)
        .select('-_id vehicle_class')
        .then(vehicles => 
          res.json( vehicles )
        )
        .catch(err =>
          res.status(500).json({ error: 'Error reading the DB' })
        );
    })

    router
    .route('/:id/starships')
    .get((req, res) => {
      const { id } = req.params
      Starship
        .find()
        .where('pilots').equals(id)
        .select('key starship_class')
        .then(starships => 
          res.json( starships )
        )
        .catch(err =>
          res.status(500).json({ error: 'Error reading the DB' })
        );
    })

module.exports = router;