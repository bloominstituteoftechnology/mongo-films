const router = require('express').Router();

const Species = require('./Specie.js');
const Character = require('../characters/Character');

router.get('/', async (req, res) => {
  try {
    const species = await Species.find({});
    res.status(200).json(species);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/populate/characters', async (req, res) => {
  try {
    const species = await Species.find();
    species.map(async (specie) => {
      const chars = await Character.find()
        .where('key')
        .in(specie.character_keys);
      specie.people = chars.map((char) => char._id);
      await specie.save();
    });
    res.json(species);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

/*
  .post(async (req, res) => {
    try {
      const specie = new Specie(req.body);
      const savedSpecie = await specie.save();
      res.status(201).json(savedSpecie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const spec = await Specie.findById(req.params.id);
      res.status(200).json(spec);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Specie.findByIdAndRemove(id);
      if (response === null) {
        res.status(404).json({ message: 'not found' });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).json({
          message: 'The id provided is invalid, please check and try again.',
        });
      } else {
        res
          .status(500)
          .json({ errorMessage: 'The specie could not be removed', err });
      }
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      // const { body } = req.body;
      const response = await Specie.findByIdAndUpdate(id, req.body);
      if (response === null) {
        res.status(404).json({ message: 'not found' });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).json({
          message: 'The id provided is invalid, please check and try again.',
        });
      } else {
        res
          .status(500)
          .json({ errorMessage: 'The specie could not be updated', err });
      }
    }
  });
  */
module.exports = router;
