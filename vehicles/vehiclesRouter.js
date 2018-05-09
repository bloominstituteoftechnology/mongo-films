const express = require('express');

const Vehicle = require('./Vehicle.js');

const router = express.Router();

router.get('/', (req, res) => {
    Vehicle
        .find()
        .then(vehicle => res.status(200).json(vehicle))
        .catch(err => res.status(500).json({ msg: 'Server Error! Cannot find vehicles' }))
})
router.post('/', (req, res) => {
    const userInput = req.body;
    const vehicle = new vehicle( userInput )
    Vehicle
        .save()
        .then(vehicle => res.status(201).json(vehicle))
        .catch(err => res.status(500).json({ err: 'Unable to post new vehicle' }))
})
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    Vehicle
        .findByIdAndUpdate(id, userInput)
        .then(vehicle => res.status(200).json({msg: 'Updated vehicle Successfully'}))
        .catch(err => res.status(500).json(err))
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Vehicle
        .findByIdAndRemove(id)
        .then(vehicle => res.status(200).json({msg: 'Deleted vehicle Successfully'}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
