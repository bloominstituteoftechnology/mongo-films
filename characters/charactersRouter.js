const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film')
const Vehicle = require('../vehicles/Vehicle')

const router = express.Router();

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router
    .route('/')
    .get((req, res) => {
        let { minheight } = req.query;
        minheight = Number(minheight);
        if (minheight) { // if minheight is part of the req.query ...
        Character.find({})
        .where('gender').equals('female') // find characters where the gender equals female
        .where('height').gt(minheight) // find characters where the height is greater than the req.query
        .then(character => {
            res.status(200).json({ character }) // return those characters
        })
        .catch(err => {
            sendUserError(500, "The character information could not be found.", res)
        })
        let { released } = req.query;
        released = Date()
    } else {
        Character.find() // find all characters
        .then(chars => {
        let character = []
        const promises = chars.map(char => { // map over the characters and for each character,
            return Film.find({ characters: char.id }) // return films where the characters field matches the character ID
            .select('title') // only select the title
            .then(films => { // then with the resulting films....
                character.push({ ...char._doc, movies: films }); // set the movies field to equal the films, add it to the character, and push it into a variable called character
            })
            .catch(err => sendUserError(500, err.message, res))
        });
        Promise.all(promises).then(char => res.status(200).json(character)).catch(err => sendUserError(500, err.message, res))
    }).catch(err => sendUserError(500, err.message, res)) // then return the character, complete with new movies field
}})
    // .post((req, res) => {
    //     const character = { name, edited, created, gender, height, hair_color, skin_color, eye_color, birth_year, key, homeworld_key, homeworld } = req.body;
    //     const newCharacter = new Character(character);
    //     newCharacter
    //         .save()
    //         .then(savedCharacter => res.status(201).json(savedCharacter))
    //         .catch(err => sendUserError(500, err.message, res))
    // });

router
    .route('/:id')
        .get((req, res) => {
            const { id } = req.params;            
            Character.findById(id)
                .populate('homeworld', '-_id name climate terrain gravity orbital_period') //populate the homeworld field and only populate these properties
                .select('-_id -_v -key -homeworld_key') // do not include these properties
                .then(char => {
                    Film.find()
                    .where('characters').in([id]) // find films where the ID in characters matches the id in req.params.id
                    .select('-_id title opening_crawl release_date') // then select these properties
                    .then((movies => {
                        let character = Object.assign({}, char._doc, { movies }) // need to target ._doc because Object.assign and the spread operator will return everything that comes with a response object (including things like whether or not the field was populated)
                        res.json({ character }) // because we're pulling from two collections and we want the return from the Film collection inside the Character collection, use spread operator or Object.assign
                    }))
                    .catch(error => res.status(500).json({ error: error }))
                })
                .catch(err => sendUserError(500, err.message, res))

        })

    router
        .route('/:id/vehicles')
            .get((req, res) => {
                const { id } = req.params;
                Vehicle.find()
                    .where('pilots').in([id]) // Look in the Vehicle collection and find vehicles where the pilots field has the same ID as the req.params.id
                    .select('-_id vehicle_class') // Select these fields
                    .then((vehicles) => {
                        res.json({ vehicles });
                    })
                    .catch(err => res.status(500).json({ error: 'Error fetching vehicles' }));
            })
module.exports = router;
