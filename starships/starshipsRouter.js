const router = require('express').Router();

const Starship = require('./Starship.js');

router.route('/').get(async (req, res) => {
  try {
    const starships = await Starship.find({});
    res.status(200).json(starships);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   .post(async (req, res) => {
//     try {
//       const starship = new Starship(req.body);
//       const savedStarship = await starship.save();
//       res.status(201).json(savedStarship);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       const stars = await Starship.findById(req.params.id);
//       res.status(200).json(stars);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })

//   .delete(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const response = await Starship.findByIdAndRemove(id);
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
//           .json({ errorMessage: 'The starship could not be removed', err });
//       }
//     }
//   })

//   .put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       // const { body } = req.body;
//       const response = await Starship.findByIdAndUpdate(id, req.body);
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
//           .json({ errorMessage: 'The starship could not be updated', err });
//       }
//     }
//   });
module.exports = router;
