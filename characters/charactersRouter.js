const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

// add endpoints here
// Find all female characters taller than 100cm

router
  .route('/')
  .get((req, res) => {
    const { minheight } = req.query;
    
    if (minheight) {
      Character.find({ gender: 'female', height: { $exists: true }, $where: `this.height >= ${ minheight }`})
	.then(characters => {
	  res.status(200).json(characters);
	})
	.catch(err=> {
	  res.status(500).json({ error: 'There was an error retrieving the data' });
	});
    } else {
      Character.find({})
	.then(characters => {
	  res.status(200).json(characters);
	})
	.catch(err=> {
	  res.status(500).json({ error: 'There was an error retrieving the data' });
	});
    }
  });
//Character find by id, populate homeworld
//added movies property that should be an array of all movies where the character appeared

router
	.route('/:id')
	.get((req, res) => {
	  const { id } = req.params;
	  let charFilms;

	  Film.find({})
	    .where({ characters: id })
	    .then(films => {
	      charFilms = films.map(film => film.title);
	    });
	  
	  Character.findById(id)
		.populate('homeworld')
	        .then(character => {
		  res.status(200).json({ character, movies: charFilms });
		  })
		.catch(err => {
		  res.status(500).json({ error: 'There was an error retrieving the data' });
		  });
		});

//Find all vehicles driven by a given character
router
  .route('/:id/vehicles')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .then(character => {
       	Vehicle.find({ pilots: id })
	  .select('vehicle_class')
	  .then(vehicles => {
	    res.status(200).json(vehicles);
	  })
          .catch(err => {
            res.status(500).json({ error: 'There was an error retrieving the data.' });
	  });
	 
      });
  });
  
//Given planet id, find all characters born there and all native species (/api/planet/:id)
//I put this in the Planet Router
module.exports = router;
