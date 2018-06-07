const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicles = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    let search = {}
    const size = Object.keys(req.query).length;
    const queryValue = req.query.minheight;
    const genderValue = req.query.gender;

    if(size > 0){
      search = {height: {$gt:queryValue}, gender:`${genderValue}`};
      console.log("search if",search)
    } 
    console.log("search else",search)
    // console.log(search)
    Character.find(search)      
      .populate('homeworld', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .post((req, res) => {
    const char = ({ name, gender, skin_color, hair_color, height, eye_color, birth_year } = req.body);
    const newChar = new Character(char)
    newChar.save()
      .then(c => res.status(201).json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld', '-_id -__v')
      .then(c => {
        console.log(c.key)
        Film.find({ character_ids: c.key}, '-_id title')
          .then(f => {
            // console.log(f)
            movies = [...f];
            
            // newC = Object.assign(c,{'movies':f})
            // console.log(newC)
            c['movie'] = movies;
            console.log("c",c.movie)
            res.json(c);
          })
      })
      .catch(e => res.status(500).json({ error: e.message }))
  })

  

  .delete((req, res) => {
    const { id } = req.params;
    Character.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  router
  .route('/:id/vehicles')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld', 'name climate terrain gravity diameter')// { username: 1, firstName: 1, lastName: 1, _id: 0 } A WAY to do this.3
      .then(foundCharacter => {
        Vehicles
        .find({ pilot_keys: foundCharacter.key}, 'vehicle_class -_id')
        .then(foundFilm => {
          console.log(foundFilm)
          foundCharacter.vehicles = [...foundFilm]
          res.json(foundCharacter)
        })
      })
      .catch(err => res.status(500).json({ error: err }));
    });

module.exports = router;
