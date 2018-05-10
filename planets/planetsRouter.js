const express = require('express');

const Planet = require('./Planet.js');

const router = express.Router();

router.get('/', (req, res) => {
    Planet
        .find()
        .then(planet => res.status(200).json(planet))
        .catch(err => res.status(500).json({ msg: 'Server Error! Cannot find planets' }))
})
router.post('/', (req, res) => {
    const userInput = req.body;
    const planet = new Planet( userInput )
    planet
        .save()
        .then(planet => res.status(201).json(planet))
        .catch(err => res.status(500).json({ err: 'Unable to post new planet' }))
})
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    Planet
        .findByIdAndUpdate(id, userInput)
        .then(planet => res.status(200).json({msg: 'Updated Planet Successfully'}))
        .catch(err => res.status(500).json(err))
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
   Planet
        .findByIdAndRemove(id)
        .then(planet => res.status(200).json({msg: 'Deleted Planet Successfully'}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
