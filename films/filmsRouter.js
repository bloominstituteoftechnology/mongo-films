const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

router.get('/', (req, res) => {
    Film
    .find()
    .then(films => {
        res.status(200).json(films)
    })
    .catch(err => {
        res.status(500).json({ msg: "error fetching films", err })
    })
})

router.post('/', (req, res) => {
    const userInput = req.body;
    const film = new Film(userInput);
    film
    .save()
    .then(film => {
        res.status(201).json(film)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    const options = { new: true }
    Film
    .findByIdAndUpdate(id, userInput, options)
    .then(film => {
        if(film){
            res.status(200).json(film)
        } else {
            res.status(404).json({ msg: "Film not found" })
        }
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Film
    .findByIdAndRemove(id)
    .then(film => {
        res.status(200).json({ msg: 'film successfully deleted' })
    })
    .catch(err => {
        res.status(500).json({ err: "SERVER ERROR DELETING" })
    })
})


module.exports = router;
