const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here
router
    .route('/')
    .get((req, res) => {
        if(req.query.minheight) {
            Character.find({$and:[{gender:'female'}, {height:{$gte:100}}]})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        } else {
            Character.find({}).sort('key')
            .select('_id name gender height skin_color hair_color eye_color')
            .populate('homeworld')
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            });
        }
    });

router
.route('/:id')
.get((req, res) => {
    console.log(req.query.minheight);
     
    Character.find({_id: req.params.id})
    .populate('homeworld')
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    });
})
module.exports = router;
