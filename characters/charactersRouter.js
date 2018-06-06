const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        Character.find()
            .populate('homeworld', { _id: 0, _v: 0 })
            .populate('movies', { _id: 0, _v: 0 })
            .then(chars => res.status(200).json(chars))
            .catch(err => res.status(500).json({ error: err.message }))
    })
    .post((req, res) => {
        let vars = ({ name, gender, skin_color, hair_color, height, eye_color, birth_year } = req.body)
        let newC = new Character(vars)
        newC.save()
            .then(newChar => res.status(201).json(newChar))
            .catch(err => res.status(500).json({ error: err.message }))
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        Character.find({ _id: id })
            .populate('homeworld', { _id: 0, name: 1, climate: 1, terrain: 1, gravity: 1, diameter: 1 })
            .populate('movies', { _id: 0, _v: 0 })
            .then(char => res.status(200).json(char))
            .catch(err => res.status(500).json({ error: err.message }))
    })
    .put((req, res) => {
        let { id } = req.params
        let vars = ({ name, gender, skin_color, hair_color, height, eye_color, birth_year } = req.body)
        Character.findByIdAndUpdate(id, vars, { new: true })
            .then(updatedChar => res.status(201).json(updatedChar))
            .catch(err => res.status(500).json({ error: err.message }))
    })
    .delete((req, res) => {
        let { id } = req.params
        Character.findByIdAndRemove(id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err.message }))
    })

module.exports = router;
