const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')
const router = express.Router();

router.get('/', function get(req, res) {
    Character.find().sort('name')
    .populate('homeworld', 'name climate -_id' )
    .then(characters =>
      res.status(200).json(characters));
    });


router.get('/:id', function get(req, res) {
    const { id } = req.params;

     Character.findById(id)
    .populate('homeworld', 'name climate -_id' )

        .then(char => {
            Film.find({characters: id })
            .select('title')
            .then(films => {
                const character = {...char._doc, movies: films };
            res.status(200).json(character);
            });
        })
        .catch(err => {
            res.status(500).json(err)
        });
    });
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Character.findByIdAndRemove(id)
      .then(character => {
        if (character) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'whaaa?' });
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
          res.status(404).json({ msg: 'hmmmm' });
        }
      })
      .catch(err => res.status(500).json(err));
  });

module.exports = router;
