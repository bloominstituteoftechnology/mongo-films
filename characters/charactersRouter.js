const router = require('express').Router();
const mongoose = require('mongoose');
const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle');

router.get('/', async (req, res) => {
  const { minheight } = req.query;
  try {
    const response = await Character.find({ gender: 'female' })
      .where('height')
      .gt(100);
    res.json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const charByID = await Character.findById(id)
        .populate('homeworld')
        .select('name gender skin_color hair_color height eye_color birth_year');
      const movies = await Film.where({ characters: id }).select(
        'title producer director episode release_date'
      );
      res.json({ ...charByID._doc, movies });
    }
    const characters = await Character.find({});
    res.json(characters);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id/vehicles', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Vehicle.find({ pilots: [id] })
      .populate('pilots', 'name')
      .select('vehicle_class');
    res.json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//   .post(async (req, res) => {
//     try {
//       const character = new Character(req.body);
//       const savedCharacter = await character.save();
//       res.status(201).json(savedCharacter);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       const chars = await Character.findById(req.params.id);
//       res.status(200).json(chars);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })

//   .delete(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const response = await Character.findByIdAndRemove(id);
//       if (response === null) {
//         res.status(404).json({ message: 'not found' });
//       } else {
//         res.status(200).json(response);
//       }
//     } catch (err) {
//       if (err.name === 'CastError') {
//         res.status(400).json({
//           message: 'The id provided is invalid, please check and try again.',
//         });
//       } else {
//         res
//           .status(500)
//           .json({ errorMessage: 'The character could not be removed', err });
//       }
//     }
//   })

//   .put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       // const { body } = req.body;
//       const response = await Character.findByIdAndUpdate(id, req.body);
//       if (response === null) {
//         res.status(404).json({ message: 'not found' });
//       } else {
//         res.status(200).json(response);
//       }
//     } catch (err) {
//       if (err.name === 'CastError') {
//         res.status(400).json({
//           message: 'The id provided is invalid, please check and try again.',
//         });
//       } else {
//         res
//           .status(500)
//           .json({ errorMessage: 'The character could not be updated', err });
//       }
//     }
// });

module.exports = router;
