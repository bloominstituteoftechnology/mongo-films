const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req,res) => {
        if (req.query.producer) {
        
            Film
            .find({producer: {$regex:`${req.query.producer}`, $options:'i'}})
            .select('title producer')
            .populate('characters', '_id name gender height skin_color hair_color eye_color')
            .populate('planets', {name:1, climate:1, terrain:1, gravity:1, diameter:1, _id:0})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        } else if (req.query.released) {
            console.log(req.query.released);
            Film
            .find({release_date: {$regex: `^${req.query.released}`}})
            .populate('characters', '_id name gender height skin_color hair_color eye_color')
            .populate('planets', {name:1, climate:1, terrain:1, gravity:1, diameter:1, _id:0})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        } else {

            Film.find({})
            .sort('episodes')
            .populate('characters', '_id name gender height skin_color hair_color eye_color')
            .populate('planets', {name:1, climate:1, terrain:1, gravity:1, diameter:1, _id:0})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
    });
module.exports = router;
