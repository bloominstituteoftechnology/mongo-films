const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Character.find()
            .then(characters => {
                if (characters.length === 0) {
                    res.status(404).json('There are no characters in the database.');
                    return;
                }
                else {
                    res.status(200).json(characters);
                }
            })
            .catch(error => res(500).json(error.message))
    })
    .post((req, res) => {
        const char = ({ name, gender, height, hair_color, skin_color, eye_color, birth_year, key, homeworld_key } = req.body);
        char.edited = Date.now();
        char.created = Date.now();
        const newCharacter = new Character(char);
        newCharacter.save()
            .then(savedCharacter => {
                res.status(201).json(savedCharacter);
            })
            .catch(error => res.status(400).json(error.message));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .then(foundCharacter => {
                if (foundCharacter === null) {
                    res.status(404).json('The requested character ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(foundCharacter);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Character.findByIdAndRemove(id)
            .then(removeCharacter => {
                if (removeCharacter === null) {
                    res.status(404).json('The requested character ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(removeCharacter);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ name, gender, height, hair_color, skin_color, eye_color, birth_year, key, homeworld_key } = req.body);
        updates.edited = Date.now();
        Character.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedCharacter => {
                if (updatedCharacter === null) {
                    res.status(404).json('The requested character ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(updatedCharacter);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })


module.exports = router;
