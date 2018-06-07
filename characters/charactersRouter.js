const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req,res) => {
        Character.find()
            .then(swchar => {
                res.status(200).json(swchar);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        const character = ({ key, name, edited, created, gender, height, hair_color, skin_color, eye_color } = req.body);
        const newCharacter = new Character(character);
        if (!name) {
            res.status(400).json({ error: error })
        } else {
            newCharacter
                .save()
                .then(addCharacter => {
                    res.status(201).json(addCharacter);
                })
                .catch(error => {
                    res.status(400).json({error: err.message})
                })
    }})

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Character.findById(id)
            .then(findChar => {
                if(findChar) {
                    res.json(findChar);
                } else {
                    res.status(404).json({error: error.message});
                }
            }) 
            .catch(error => res.status(500).json({ error: error.message }));
    })

    .delete((req, res) => {
        const { id } = req.params;
        Character.findByIdAndRemove(id)
            .then(removeChar => {
                if (removeChar) {
                    res.json(removeChar);
                } else {
                    res.status(404).json({ error: 'This ID does not exist.'})
                    return;
                }})
                .catch(error => {
                    res.json(500).json({ error: err.message })
                })
    })

    .put((req, res) => {
        const { id } = req.params;
        const character = ({ 
            name,
            edited,
            created,
            gender,
            height,
            hair_color,
            skin_color,
            eye_color,
            birth_year,
            key,
            homeworld_key
        } = req.body);
        Character.findByIdAndUpdate(id, character, { new: true })
            .then(updateChar => {
                if (update) {
                    res.json(updateChar);
                } else {
                    res.status(404).json({ error: "This ID does not exist."});
                }
            })

            .catch(error => {
                res.status(400).json({ error: error.message })
            })
    })

module.exports = router;
