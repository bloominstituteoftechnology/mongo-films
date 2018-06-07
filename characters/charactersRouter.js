const express = require('express');

const Character = require('./Character.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req,res) => {
        Character.find()
            .then(character => {
                res.status(200).json(character);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })

    .post((req, res) => {
        const { name, gender, height, hair_color, skin_color, eye_color } = req.body;
        const newCharacter = new Character({ name, gender, height, hair_color, skin_color, eye_color });
            newCharacter
                .save()
                .then(addCharacter => {
                    res.status(201).json(addCharacter);
                })
                .catch(error => {
                    res.status(400).json(error)
                })
    })

module.exports = router;
