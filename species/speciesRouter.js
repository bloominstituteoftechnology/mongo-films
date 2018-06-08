const express = require('express');

const Specie = require('./Specie.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Specie.find()
            .then(species => {
                if (species.length === 0) {
                    res.status(404).json('There are no species in the database.');
                    return;
                }
                else {
                    res.status(200).json(species);
                }
            })
            .catch(error => res(500).json(error.message))
    })
    .post((req, res) => {
        const specie = ({ classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, key, homeworld_key } = req.body);
        const newSpecie = new Specie(specie);
        newSpecie.save()
            .then(savedSpecie => {
                res.status(201).json(savedSpecie);
            })
            .catch(error => res.status(400).json(error.message));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Specie.findById(id)
            .then(foundSpecie => {
                if (foundSpecie === null) {
                    res.status(404).json('The requested specie ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(foundSpecie);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Specie.findByIdAndRemove(id)
            .then(removeSpecie => {
                if (removeSpecie === null) {
                    res.status(404).json('The requested specie ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(removeSpecie);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ classification, name, designation, eye_colors, people, skin_colors, language, hair_colors, average_lifespan, average_height, key, homeworld_key } = req.body);
        updates.edited = Date.now();
        Specie.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedSpecie => {
                if (updatedSpecie === null) {
                    res.status(404).json('The requested specie ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(updatedSpecie);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })

module.exports = router;
