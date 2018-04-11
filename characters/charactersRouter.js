const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
        .get((req, res) => {
            Character.find({})
            .populate('homeworld')
            .then(ans => {
                res.status(200).json(ans);
            })
            .catch(err => {
                res.status(500).json(err);
            })
        })
        .post((req, res) => {
            const newChar = new Character(req.body);
            if (!newChar.name) res.status(400).json({error: "A name is required"})
            else {
                newChar
                .save()
                .then(res => {
                    res.status(200).json(res);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
            }
        })
    
    router
    .route('/:id')
    .get((req, res) => {
        Character
        .findById(req.params.id)
        .populate('homeworld')
        .then(ans => {
            res.status(200).json(ans)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    .put((req, res) => {
        const updatChar = req.body
        Character
        .findByIdAndUpdate(req.params.id, updatChar)
        .then(ans => {
            res.status(200).json(updatChar)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
    .delete((req, res) => {
        Character
        .findByIdAndRemove(req.params.id)
        .then(ans => {
            res.status(200).json(ans)
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
        

module.exports = router;
