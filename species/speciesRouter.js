const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

router.get('/', (req, res) => {
    Specie
        .find()
        .then(specie => res.status(200).json(specie))
        .catch(err => res.status(500).json({ msg: 'Server Error! Cannot find species' }))
})
router.post('/', (req, res) => {
    const userInput = req.body;
    const specie = new specie( userInput )
    Specie
        .save()
        .then(specie => res.status(201).json(specie))
        .catch(err => res.status(500).json({ err: 'Unable to post new specie' }))
})
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    Specie
        .findByIdAndUpdate(id, userInput)
        .then(specie => res.status(200).json({msg: 'Updated specie Successfully'}))
        .catch(err => res.status(500).json(err))
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Specie
        .findByIdAndRemove(id)
        .then(specie => res.status(200).json({msg: 'Deleted specie Successfully'}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
