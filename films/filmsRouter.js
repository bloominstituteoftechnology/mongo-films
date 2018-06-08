const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router
    .route('/')
    .get((req, res) => {
        Film.find()
            .then(films => {
                if (films.length === 0) {
                    res.status(404).json('There are no films in the database.');
                    return;
                }
                else {
                    res.status(200).json(films);
                }
            })
            .catch(error => res.status(500).json(error.message));
    })
    .post((req, res) => {
        let postCode;
        const film = ({ episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, key, starship_ids, vehicle_ids } = req.body);
        const newFilm = new Film(film);
        newFilm.save()
            .then(savedFilm => {
                res.status(201).json(savedFilm);
            })
            .catch(error => res.status(400).json(error.message))
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Film.findById(id)
            .then(foundFilm => {
                if (foundFilm === null) {
                    res.status(404).json('The reqested film ID could not be found.'); 
                    return; 
                }
                else {
                    res.status(200).json(foundFilm);
                }
            })
            .catch(error => res.status(404).json(error.message));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Film.findByIdAndRemove(id)
            .then(removeFilm => {
                if (removeFilm === null) {
                    res.status(404).json('The requested film ID could not be found.');
                    return; 
                }
                else {
                    res.status(200).json(removeFilm);
                }
            })
            .catch(error => res.status(404).json(error.message))
    })
    .put((req, res) => {
        const { id } = req.params;
        const updates = ({ episode, planet_ids, producer, title, director, release_date, opening_crawl, character_ids, specie_ids, key, starship_ids, vehicle_ids } = req.body);
        updates.edited = Date.now(); 
        Film.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
            .then(updatedCharacter => {
                if (updatedCharacter === null) {
                    res.status(404).json('The requested film film ID could not be found.'); 
                    return; 
                }
                else {
                    res.json(updatedCharacter)
                }
            })
            .catch(error => res.status(404).json(error.message))
    })

module.exports = router;
