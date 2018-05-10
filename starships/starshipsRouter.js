const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

router.get('/', (req, res) => {
    Starship
        .find()
        .then(starship => res.status(200).json(starship))
        .catch(err => res.status(500).json({ msg: 'Server Error! Cannot find starships' }))
})
router.post('/', (req, res) => {
    const userInput = req.body;
    const starship = new Starship( userInput )
    starship
        .save()
        .then(starship => res.status(201).json(starship))
        .catch(err => res.status(500).json({ err: 'Unable to post new starship' }))
})
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    Starship
        .findByIdAndUpdate(id, userInput)
        .then(starship => res.status(200).json({msg: 'Updated starship Successfully'}))
        .catch(err => res.status(500).json(err))
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Starship
        .findByIdAndRemove(id)
        .then(starship => res.status(200).json({msg: 'Deleted starship Successfully'}))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
