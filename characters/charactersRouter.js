const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');
const Starship = require('../starships/Starship.js');

const router = express.Router();

const sendUserError = (status, message, res, err="Not from Catch") =>{
    res.status(status).json({Error: message, err});
    return;
};

// add endpoints here
const get = (req, res) =>{

    const { character } = req.query;
    if (character){
       const filtered = new RegExp(character, 'i');
       console.log(filtered);
       Character.find({})
        .where('name')
        .regex(filtered)
        .then(films => res.json(films))
        .catch(err => sendUserError(500, "There as an error in filtering results", res, err))
        }
    
    const { minheight } = req.query;
    if (minheight){
        Character.find({gender: "female", height:{$gt: minheight}},{name: 1, height:1, gender:1})
        .then(films => res.json(films))
        .catch(err => sendUserError(500, "There as an error in filtering results", res, err))
        }

    Character.find()
        .populate('homeworld', {name:1, _id:0})
        .then(characters =>{
            res.status(200).json(characters);
        })
        .catch(err =>{
            sendUserError(500, `There was an error in retrieving characters`, res, err);
        });
};

const post = (req, res) =>{
    const { name, gender, height, hair_color, skin_color, eye_color } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color};
        const character = new Character(characterTraits)

    character
        .save()
        .then(character =>{
            res.status(201).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was in error in saving character to database", res, err)
        });
};

const getId = (req, res) =>{
    const { id } = req.params;

    Character.findById(id)
        .populate('homeworld', {name:1, _id:0})
        .populate('movies', {title:1, _id:0})
        .then(character =>{
                Film.find({character_ids: id}, {title:1, episode:1, producer:1, director:1,_id:0, })
                    .then(films =>{
                        character.movies = [...films]
                    })
                    .catch(err=>{
                        sendUserError(500, "There was an error in retrieving characters from film", res, err)
                    })
                res.status(200).json(character)
        })
        .catch(err =>{
            sendUserError(500, "There was an error in fetching character");
        });
};

const deleteId = (req, res) =>{
    const { id } = req.params;

    Character
        .remove({ _id:id })
        .then(result =>{
            res.status(204).json(`Success: Character with ${id} was deleted successfully from database.`);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing character from database.", res, err);
        });
};

const updateId = (req, res) =>{
    const { id } = req.params;
    const { name, gender, height, hair_color, skin_color, eye_color } = req.body;
    const characterTraits = { name, gender, height, hair_color, skin_color, eye_color };

    if(!id){
        sendUserError(404, `There was an error in fetching character with ${id}`, res);
    }
    Character.update({ _id: id}, { $set: {characterTraits }})
        .then(character =>{
            res.status(200).json(character);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in updating the database", res, err);
        });
};

const postPlanet = (req, res) =>{
    const { id } = req.params;
    const { planetId } = req.body;

    Character.findOne({ _id: id })
        .then(foundPlanet =>{
            foundPlanet.characters = [...foundPlanet.characters, planetId];
            foundPlanet
                .save()
                .then(savedPlanet =>{
                    res.status(201).json(savedPlanet);
                })
                .catch(err =>{
                    sendUserError(500, "There was an error in saving planet to char database", res, err)
                })
        .catch(err =>{
            sendUserError(500, "There was an error in saving character to database", res, err);
            });
        });
};

const getVehicles = (req, res) => {
        const { id } = req.params;

        Vehicle.find({pilots:`${id}`},{vehicle_class:1, _id:0})
          .then(vehicles => {
            res.json(vehicles);
        })
          .catch(err => res.status(500).json({ error: err.message }));
      };

const getStarships = (req, res) => {
        const { id } = req.params;

        Starship.find({pilots:`${id}`},{starship_class:1, _id:0})
          .then(starships => {
            res.json(starships);
        })
          .catch(err => res.status(500).json({ error: err.message }));
      };
const getFilms = (req, res) =>{
    const { id } = req.params;

    Film.find({characters: `${id}`},{title:1,_id:0})
        .then(films =>{
            res.json({movies:films});
        })
        .catch(err =>{
            res.status(500).json({error:err.message})
        });
};

router.route("/")
    .get(get)
    .post(post);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId)

router.route("/:id/planet")
    .post(postPlanet)

router.route("/:id/vehicles")
    .get(getVehicles)

router.route("/:id/starships")
    .get(getStarships)

router.route("/:id/movies")
    .get(getFilms)

module.exports = router;
