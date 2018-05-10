const express = require('express');

const Character = require('./Character.js');

const router = express.Router();
const Film = require('../films/Film.js')

// add endpoints here
router.get('/:id', (req, res) => {
    const id = req.params.id;
    // let moviesArray;

    // Film
    // .find(id)
    // .then(movies => {
    //     moviesArray.push(movies)
    // })

    Character
    .find({ _id: id } )
    .then(chars => {
        res.json(chars, moviesArray)
    })
    .catch(err => {
        res.json(err)
    })
})


module.exports = router;
