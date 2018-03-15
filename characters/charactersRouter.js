const express = require('express');

const Character = require('./Character.js');
const Vehicle = require('../vehicles/Vehicle.js')

const router = express.Router();

// add endpoints here
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const height = req.params.height;

  Character.findOne({ _id: id })
    .populate('homeworld')
    .exec()
    .then(char => {
      res.status(200).json(char);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while retrieving the character from the database.' });
    });
});

router.get('/:id/vehicles', (req, res) => {
  const id = req.params.id;

  Vehicle.find({})
    .select('vehicle_class pilots').where({ pilots: id })
    .exec()
    .then (vehicle => {
      res.status(200).json(vehicle);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while retrieving the vehicles from the database.' });
    });
});

router.get('/', (req, res) => {
  const heightFilter = req.query.height;

  let query = Character.find({ gender: 'female' }).sort('name');

  Character.find({})
    .sort('name')
    .exec()
      if (heightFilter) {
        query.select('gender height name').or({ height: { $gt: 100 } });
      } 

    query.then(female => {
      res.status(200).json(female);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'There was an error while retrieving the films from the database.' });
    });
});

// {
//   "_id": {
//     "$oid":"5aa995a3b97194b732c167a9"
//   },
//   "edited": {
//     "$date":"2014-12-20T21:17:50.311Z"
//   },
//   "name": "R2-D2",
//   "created": {
//     "$date":"2014-12-10T15:11:50.376Z"
//   },
//   "gender": "n/a",
//   "skin_color": "white, blue",
//   "hair_color": "n/a",
//   "height": "96",
//   "eye_color": "red",
//   "birth_year": "33BBY",
//   "key": 3,
//   "__v": 0,
//   "homeworld_key": 8,
//   "homeworld": {
//     "$oid": "5aa995d3b97194b732c16810"
//   }
// }


module.exports = router;
