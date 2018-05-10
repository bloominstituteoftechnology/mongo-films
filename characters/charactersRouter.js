const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const character = await Character.findOne({ key: req.params.id })
    .populate('homeworld', 'name climate -_id')
    .lean()

    character.movies = await Film.find({ character_ids: character.key })
      .select('title')

    res.status(200).json(character);
});

module.exports = router;

//alternative way for reference;
// character.movies = await Film.find({
//   'character_ids': {"$elemMatch": { $eq: character.key }}
// })

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
