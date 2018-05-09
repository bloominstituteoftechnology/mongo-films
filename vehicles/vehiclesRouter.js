const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

// add endpoints here
router.route('/').get(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json(err);
  }
});

//   .post(async (req, res) => {
//     try {
//       const vehicle = new Vehicle(req.body);
//       const savedVehicle = await vehicle.save();
//       res.status(201).json(savedVehicle);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       const vehicleid = await Vehicle.findById(req.params.id);
//       res.status(200).json(vehicleid);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })

//   .delete(async (req, res) => {
//     try {
//       const { id } = req.params;
//       const response = await Vehicle.findByIdAndRemove(id);
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
//           .json({ errorMessage: 'The vehicle could not be removed', err });
//       }
//     }
//   })

//   .put(async (req, res) => {
//     try {
//       const { id } = req.params;
//       // const { body } = req.body;
//       const response = await Vehicle.findByIdAndUpdate(id, req.body);
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
//           .json({ errorMessage: 'The vehicle could not be updated', err });
//       }
//     }
//   });
module.exports = router;
