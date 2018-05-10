const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

router.get('/', (req, res) => {
    Character
    .find()
    .then(characters => {
        const promises = characters.map(chars => {
            return chars.then()
        })
        // Promise.all()
        res.status(200).json(characters)
    })
    .catch(err => {
        res.status(500).json({ msg: "error fetching characters", err })
    })
})

// router.get('/:id', (req, res) => {
//     Character
//     .findById(req.params.id)
//     .populate('homeworld', "name climate -_id")
//     .then(characters => res.status(200).json(characters))
//     .catch(err => {
//         res.status(500).json({ msg: "error fetching characters", err })
//     })
// })

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Character
    .findById(id)
    .populate('homeworld', "name -_id")

    .then(characters => {
        Film.find({ characters: id})
        .select('title')
        .then(films => {
            const character = { ...characters._docs, movies: films }
            res.status(200).json(character)
        })
    })
    .catch(err => {
        res.status(500).json({ msg: "error fetching characters", err })
    })
})

router.post('/', (req, res) => {
    const userInput = req.body;
    const character = new Character(userInput);
    character
    .save()
    .then(character => {
        res.status(201).json(character)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    const options = { new: true }
    Character
    .findByIdAndUpdate(id, userInput, options)
    .then(character => {
        if(character){
            res.status(200).json(character)
        } else {
            res.status(404).json({ msg: "character not found" })
        }
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Character
    .findByIdAndRemove(id)
    .then(character => {
        res.status(200).json({ msg: 'character successfully deleted' })
    })
    .catch(err => {
        res.status(500).json({ err: "SERVER ERROR DELETING" })
    })
})


module.exports = router;
