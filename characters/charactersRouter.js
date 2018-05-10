const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.query.minheight) {
		console.log(req.query.minheight);
		Character.find({
			height: { $gte: req.query.minheight },
			gender: 'female',
		})
			.then(chars => {
				res.status(200).json(chars);
			})
			.catch(err => {
				console.log(err);
			});
	} else res.status(404).json(' Not Found Is Character');
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	Character.findById(id)
		.populate('homeworld')
		.then(char => {
			Film.find({ characters: id })
				.select('title producer director episode release_date')
				.then(films => {
					const character = { ...char._doc, movies: films };
					res.status(200).json(character);
				});
		})
		.catch(err => {
			res.status(500).json('not found');
		});
});

router.get('/:id/vehicles', (req, res) => {
	Vehicle.find({ pilots: req.params.id })
		.select('vehicle_class')
		.populate('pilots', 'name')
		.then(vehicles => res.send(vehicles));
});
router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Character.findById(id)
      .populate('homeworld')
      .then(character => {
        if (character === null) {
          res.status(404).json({ message: 'Not Found Is The ID' });
        } else {
          res.json(character);
        }
      })
			.catch(err => {
				console.log(err);
			});
      })
  .put((req, res) => {
    const { id } = req.params;
    const { body } = req;
    Character.findByIdAndUpdate(id, body)
      .then(response => {
        Character.findById(id)
          .then(updated => res.json(updated))
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
	})
	.post((req, res) => {
		const { body } = req;
		Character.create(body)
			.then(response => {
				res.json(response);
			})
			.catch(error => {
				res.status(500).json(error);
			});
	})
  .delete((req, res) => {
    const { id } = req.params;
    Character.findByIdAndRemove(id)
      .then(deleted => res.json(deleted))
      .catch(err => res.status(500).json(error));
  });
module.exports = router;
