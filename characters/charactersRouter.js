const express = require('express');

const Character = require('./Character.js');

// const Character = require('./Character.js');
const Film = require('../films/Film');
const Vehicle = require('../vehicles/Vehicle');
const router = express.Router();

// add endpoints here
router.post('/', function post(req, res) {
  const characterData = req.body;
  const character = new Character(characterData);

  character
    .save()
    .then(character => {
      res.status(201).json(character);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});



// add endpoints here
router.get('/', function (req, res) {
  let query = Character.find()
  const qheight = req.query.minheight;
  // parseInt(qheight);
  if (req.query.minheight) {
    query.where({ gender: "female" })
    query.where("height").gte(qheight)
  };

  query.then(chars =>
    res.status(200).json(chars)
  )
    .catch(err => {
      res.status(500).json(err);
    });

});


router.get('/:id', function (req, res) {
  const { id } = req.params;

  Character.findById(id)
    .populate('homeworld', 'climate -_id')
    .populate('vehicles', 'vehicle_class')
    .then(char => {
      console.log("this is inside find by ID for character router. Char is: ", char)
      Film
        .find({ characters: id })
        // .findById(id)
        .select('title')
        .then(films => {
          const character = { ...char._doc, movies: films };

          res.status(200).json(character);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get('/:id/vehicles', function (req, res) {
  const { id } = req.params;

  Vehicle

    .find().where({ pilots: id })
    .select('vehicle_class')

    .then(char => {

      res.json(char)

    })
    .catch(err => {
      res.status(500).json(err);
    });
})

// });




// /api/characters/1234
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Character.findByIdAndRemove(id)
    .then(character => {
      if (character) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'character not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const options = {
    new: true,
  };

  Character.findByIdAndUpdate(id, update, options)
    .then(character => {
      if (character) {
        res.status(200).json(character);
      } else {
        res.status(404).json({ msg: 'character not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
