const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const express = require('express')
const Planet = require('./Planet.js')
const Character = require('../characters/Character.js')
const Specie = require('../species/Specie.js')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        Planet.find()
            .then(planets => {
                res.json(planets)
            })
            .catch( err => {
                res.status(500).json({ error: err.message })
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Planet.find({ _id: { $eq: ObjectId(id) } })
            .then( planet => {
                let charsAndSpecies = {}
                Character.find({ 'homeworld': id })
                    .then( chars => {
                        Specie.find({ 'homeworld': id })
                            .then( species => {
                                charsAndSpecies = {
                                    ...charsAndSpecies, 
                                    characters: chars, 
                                    species: species}
                                res.json(charsAndSpecies)
                            })
                            .catch( err => {
                                res.status(500).json({ error: err.message })
                            })
                    })
                    .catch( err => {
                        res.status(500).json({ error: err.message })
                    })
            })
            .catch( err => {
                res.status(500).json({ error: err.message })
            })
    })
    
module.exports = router
