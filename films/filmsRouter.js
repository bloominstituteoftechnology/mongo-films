const express = require('express');

const Film = require('./Film.js');

const router = express.Router();
// add endpoints here

router
.route('/')
.get((req, res) => {
  const { producer, released } = req.query;

  let filmQuery = Film.find();

  if(producer){
    const producerFilter = new RegExp(req.query.producer, 'i');
    filmQuery
      .where('producer')
      .regex(producerFilter);
  }

  if(released){
    const releasedFilter = new RegExp(req.query.released, 'i');
    filmQuery
      .where('release_date')
      .regex(releasedFilter);
  }
  
  filmQuery
    .sort( { episode: 1 } )
    .select('-_id episode producer release_date')
    .populate('characters', 'name gender height skin_color hair_color eye_color')
    .populate('planets', '-_id name climate terrain gravity diameter')
    .populate('starships')
    .populate('species')
    .populate({
      path: 'vehicles',
      populate: { path: 'pilots'}
    })
    .then(films => 
      res.json(films)
    )
    .catch(err => 
      res.status(500).json({ error: 'Error reading the DB' })
    )
})

module.exports = router;