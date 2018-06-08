const express = require('express');

const Starship = require('./Starship.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Starship.find()
            .then(starships => {
                if (starships.length === 0) {
                    res.status(404).json('There are no starships in the database.');
                    return;
                }
                else {
                    res.status(200).json(starships);
                }
            })
            .catch(error => res(500).json(error.message))
    })
    .post((req, res) => {
        const starship = ({ pilot_keys, mglt, starship_class, hyperdrive_rating, key } = req.body);
        const newStarship = new Starship(starship);
        newStarship.save()
            .then(savedStarship => {
                res.status(201).json(savedStarship);
            })
            .catch(error => res.status(400).json(error.message));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Starship.findById(id)
            .then(foundStarship => {
                if (foundStarship === null) {
                    res.status(404).json('The requested starship ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(foundStarship);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Starship.findByIdAndRemove(id)
            .then(removeStarship => {
                if (removeStarship === null) {
                    res.status(404).json('The requested starship ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(removeStarship);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ pilot_keys, mglt, starship_class, hyperdrive_rating, key } = req.body);
        Starship.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedStarship => {
                if (updatedStarship === null) {
                    res.status(404).json('The requested starship ID could not be found.');
                    return;
                }
                else {
                    res.status(200).json(updatedStarship);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })


module.exports = router;