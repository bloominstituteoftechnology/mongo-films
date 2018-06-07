const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

// add endpoints here
router
  .route('/')
  .get((req, res) => {
    Character.find()
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


module.exports = router;
