const express = require('express');

const Character = require('./Character');
const Vehicle = require('../vehicles/Vehicle');
const Film = require('../films/Film');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = Character.find()
    .where('gender').equals('female');

  if (req.query.minheight) {
    query.where('height').gt(req.query.minheight);
  }

  const characters = await query.exec() 
  res.status(200).json(characters);
});

router.get('/:id', async (req, res) => {
  const character = await Character.findOne({ key: req.params.id })
    .populate('homeworld', 'name climate -_id')
    .lean()

    character.movies = await Film.find({ character_ids: character.key })
      .select('title')

    res.status(200).json(character);
});

router.get('/:id/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find({ pilot_keys: req.params.id });

  res.status(200).json(vehicles);
});

module.exports = router;

//alternative way for reference;
// character.movies = await Film.find({
//   'character_ids': {"$elemMatch": { $eq: character.key }}
// })

// Character.find({gender: 'female', height: {$exists: true}, $where: `this.height >= 200`})

/*
 * https://stackoverflow.com/questions/30173606/how-to-query-nested-arrays-in-mongoose
 * https://github.com/Automattic/mongoose/issues/2799
router.get('/:id', async (req, res) => {
  const character = await Character.findOne({ key: req.params.id })
    .populate('homeworld', 'name climate -_id')
    .lean()

    character.movies = await Film.find()
      .select('title')
      .elemMatch('character_ids', { $eq: character.key });

    res.status(200).json(character);
});
*/
