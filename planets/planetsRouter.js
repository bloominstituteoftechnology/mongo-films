const router = require('express').Router();
const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      const planets = await Planet.find({});
      return res.json(planets);
    }
    const chars = await Character.find({ homeworld: id }).select('name');
    const spec = await Specie.find({ homeworld: id }).select('name');
    res.json({ chars, spec });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

/*
  .post(async (req, res) => {
    try {
      const planet = new Planet(req.body);
      const savedPlanet = await planet.save();
      res.status(201).json(savedPlanet);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const planetid = await Planet.findById(req.params.id);
      res.status(200).json(planetid);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Planet.findByIdAndRemove(id);
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
          .json({ errorMessage: 'The planet could not be removed', err });
      }
    }
  })

  .put(async (req, res) => {
    try {
      const { id } = req.params;
      // const { body } = req.body;
      const response = await Planet.findByIdAndUpdate(id, req.body);
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
          .json({ errorMessage: 'The planet could not be updated', err });
      }
    }
  });
*/

module.exports = router;
