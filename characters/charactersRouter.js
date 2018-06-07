const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const express = require('express')
const Character = require('./Character.js')
const Film = require('../films/Film.js')
const Vehicle = require('../vehicles/Vehicle.js')
const router = express.Router()

router
    .route('/')
    .get((req, res) => {
        const { minheight } = req.query
        if (minheight) {
            Character.find({ 'height': { $gt: 100 } })
                .then( chars => {
                    res.json(chars)
                })
                .catch( err => {
                    res.status(500).json({ error: err.message })
                })
        }  else {
            Character.find()
                .then( chars => {
                    res.json(chars)
                })
                .catch( err => {
                    res.status(500).json({ error: err.message })
                })
        }
        
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params
        Character.find({_id: {$eq: ObjectId(id)}})
            .populate(
                'homeworld',
                'name climate terrain gravity diameter'
            )
            .then( char => {
                Film.find({characters: id})
                    .select('title episode')
                    .sort('episode')
                    .then( films => {
                        const newChar = {...char, movies: films}
                        res.json(newChar)
                    })
            })
            .catch( err => {
                res.status(500).json({ error: err.message })
            })
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params
        Character.find({_id: {$eq: ObjectId(id)}})
            .populate(
                'homeworld',
                'name climate terrain gravity diameter'
            )
            .then( char => {
                Vehicle.find({pilots: id})
                    .then( vehicles => {
                        res.json(vehicles)
                    })
                    .catch( err => {
                        res.status(500).json({ error: err.message })
                    })
            })
    })
module.exports = router
