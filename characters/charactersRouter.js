const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req,res) => {
        let query = { ...req.query };
        if (req.query.minheight) {
            query['$where'] = `this.height >= ${req.query.minheight}`;
            delete query.minheight;
        }

        if (req.query.maxheight) {
            query['$where'] = `this.height <= ${req.query.maxheight}`;
            delete query.maxheight;
        }

        Character.find(query)
            .populate('homeworld', {_id: 0, __v: 0 })
            .then(characters => {
                res.status(200).json(characters);
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
            .populate('homeworld', {_id: 0, __v: 0})
            .then(character => {
                let charKey = character.key;
                Film.find({ character_ids: Number(charKey) }, { title: 1, producer: 1, director: 1, _id: 0 })
                    .then(films => {
                        character.movies = [ ...films ];
                        res.json(character)
                    })
                // if(findChar) {
                //     res.json(findChar);
                // } else {
                //     res.status(404).json({error: error.message});
                // }
            }) 
            .catch(error => res.status(500).json({ error: error.message }));
    })

    .delete((req, res) => {
        const { id } = req.params;
        Character.findByIdAndRemove(id)
            .then(removeChar => {
                    res.json(removeChar);
                })
                .catch(error => {
                    res.json(500).json({ error: err.message })
                })
    })

    .put((req, res) => {
        const { id } = req.params;
        // const character = ({ 
        //     name,
        //     edited,
        //     created,
        //     gender,
        //     height,
        //     hair_color,
        //     skin_color,
        //     eye_color,
        //     birth_year,
        //     key,
        //     homeworld_key
        // } = req.body);
        Character.findByIdAndUpdate(id, req.body, { new: true })
        populate('homeworld', {_id: 0, __v: 0})
            .then(updateChar => {
                res.json(updateChar);
            })
            .catch(error => {
                res.status(500).json({ error: error.message})
            })
    })

router
    .route('/:id/vehicles')
    .get((req, res) => {
        const { id } = req.params;
        Vehicle.find({pilots: `${id}`})
            .then(vehicles => {
                res.json(vehicles);
            })
            .catch(error => {
                res.status(500).json({ error: error.message})
            })
    })

module.exports = router;
