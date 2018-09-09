const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
// function escapeRegex(text) {
//   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

router
  .route('/')
  .get((req, res) => {
    const query = {};
    if (req.query) {
      console.log("if")
      for (let key in req.query) {
        // console.log(key,req.query[key])
       query[key] = new RegExp(req.query[key], 'gi');
      }
     }
       
    console.log(query); 
    // url to search http://localhost:5000/api/films?release_date=2005
    Film.find(query, 'director producer release_date')
      .sort('episode')
      // .populate('starships', '-_id -__v')
      // .populate('vehicles', '-_id -__v')
      .populate('planets', '-_id name climate terrain gravity diameter')
      // .populate('species', '-_id -__v')
      .populate('characters', '-birth_year -__v -homeworld -homeworld_key -key -edited -created')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })



  router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Film.findById(id)
      .populate('starships', '-_id -__v')
      .populate('vehicles', '-_id -__v')
      .populate('planets', '-_id -__v')
      .populate('species', '-_id -__v')
      .populate('characters', '-_id -__v')
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Film.findByIdAndRemove(id)
      .then(c => res.json(c))
      .catch(e => res.status(500).json({ error: e.message }))
  })

module.exports = router;
